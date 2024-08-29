import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Result "mo:base/Result";

actor {
  // Types
  type Recipe = {
    id: Nat;
    name: Text;
    ingredients: [Text];
    instructions: Text;
    mealType: Text;
  };

  type Meal = {
    breakfast: ?Nat;
    lunch: ?Nat;
    dinner: ?Nat;
  };

  type MealPlan = [Meal];

  // Stable variables
  stable var recipeIdCounter: Nat = 0;
  stable var recipes: [(Nat, Recipe)] = [];
  stable var currentMealPlan: MealPlan = Array.tabulate(7, func(_: Nat): Meal { { breakfast = null; lunch = null; dinner = null } });

  // Initialize HashMap from stable storage
  let recipeMap = HashMap.fromIter<Nat, Recipe>(recipes.vals(), 10, Nat.equal, Hash.hash);

  // Helper functions
  func generateId(): Nat {
    recipeIdCounter += 1;
    recipeIdCounter
  };

  func uniqueElements(arr: [Text]): [Text] {
    let seen = HashMap.HashMap<Text, Bool>(0, Text.equal, Text.hash);
    Array.filter(arr, func (item: Text): Bool {
      switch (seen.get(item)) {
        case null { seen.put(item, true); true };
        case (?_) { false };
      }
    })
  };

  // Main functions
  public func addRecipe(name: Text, ingredients: [Text], instructions: Text, mealType: Text): async Nat {
    let id = generateId();
    let newRecipe: Recipe = {
      id;
      name;
      ingredients;
      instructions;
      mealType;
    };
    recipeMap.put(id, newRecipe);
    id
  };

  public query func getRecipes(): async [Recipe] {
    Iter.toArray(recipeMap.vals())
  };

  public func createMealPlan(plan: MealPlan): async Result.Result<(), Text> {
    if (plan.size() != 7) {
      return #err("Meal plan must cover 7 days");
    };
    currentMealPlan := plan;
    #ok(())
  };

  public query func getMealPlan(): async MealPlan {
    currentMealPlan
  };

  public query func generateShoppingList(): async [Text] {
    var ingredients = List.nil<Text>();
    for (day in currentMealPlan.vals()) {
      let mealIds = [day.breakfast, day.lunch, day.dinner];
      for (mealId in mealIds.vals()) {
        switch (mealId) {
          case (?id) {
            switch (recipeMap.get(id)) {
              case (?recipe) {
                ingredients := List.append(ingredients, List.fromArray(recipe.ingredients));
              };
              case null {}
            };
          };
          case null {}
        };
      };
    };
    uniqueElements(List.toArray(ingredients))
  };

  // System functions
  system func preupgrade() {
    recipes := Iter.toArray(recipeMap.entries());
  };

  system func postupgrade() {
    recipes := [];
  };
}
