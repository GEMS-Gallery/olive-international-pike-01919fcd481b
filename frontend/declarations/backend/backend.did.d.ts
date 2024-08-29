import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Meal {
  'breakfast' : [] | [bigint],
  'lunch' : [] | [bigint],
  'dinner' : [] | [bigint],
}
export type MealPlan = Array<Meal>;
export interface Recipe {
  'id' : bigint,
  'name' : string,
  'instructions' : string,
  'ingredients' : Array<string>,
  'mealType' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'addRecipe' : ActorMethod<[string, Array<string>, string, string], bigint>,
  'createMealPlan' : ActorMethod<[MealPlan], Result>,
  'generateShoppingList' : ActorMethod<[], Array<string>>,
  'getMealPlan' : ActorMethod<[], MealPlan>,
  'getRecipes' : ActorMethod<[], Array<Recipe>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
