import { Action as ReduxAction } from "redux";
import { Routine } from "redux-saga-routines";
//import { Routine } from "redux-saga-routines";

export interface Action<T> extends ReduxAction<T> {
	meta?: { [key: string]: any };
}

/**
 * A better typing for the Redux Action
 */
export interface ActionWithPayload<T extends string, P> extends Action<T> {
	payload: P;
}

/**
 * Create a new action with type and payload
 *
 * @param type The action type
 * @param payload The payload
 */
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
	type: T,
	payload: P,
	meta?: { [key: string]: string }
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(
	type: T,
	payload?: P,
	meta?: { [key: string]: string }
): ActionWithPayload<T, any> {
	return { type, payload, meta };
}

type ActionsCreatorsMapObject = {
	[actionCreator: string]: (...args: any[]) => any;
};
export type ActionsUnion<A extends ActionsCreatorsMapObject> = ReturnType<A[keyof A]>;
export type ActionsOfType<ActionUnion, ActionType extends string> = ActionUnion extends Action<ActionType>
	? ActionUnion
	: never;

export type ApiRoutineActionsUnion<A extends Routine> =
	| ReturnType<A["trigger"]>
	| ReturnType<A["request"]>
	| ReturnType<A["success"]>
	| ReturnType<A["failure"]>
	| ReturnType<A["fulfill"]>;
