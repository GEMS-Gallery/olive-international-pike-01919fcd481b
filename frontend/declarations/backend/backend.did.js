export const idlFactory = ({ IDL }) => {
  const Meal = IDL.Record({
    'breakfast' : IDL.Opt(IDL.Nat),
    'lunch' : IDL.Opt(IDL.Nat),
    'dinner' : IDL.Opt(IDL.Nat),
  });
  const MealPlan = IDL.Vec(Meal);
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Recipe = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'instructions' : IDL.Text,
    'ingredients' : IDL.Vec(IDL.Text),
    'mealType' : IDL.Text,
  });
  return IDL.Service({
    'addRecipe' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text), IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'createMealPlan' : IDL.Func([MealPlan], [Result], []),
    'generateShoppingList' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getMealPlan' : IDL.Func([], [MealPlan], ['query']),
    'getRecipes' : IDL.Func([], [IDL.Vec(Recipe)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
