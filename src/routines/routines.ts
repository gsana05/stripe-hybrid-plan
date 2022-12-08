import { PendingPurchasedToken } from "../types/Types";
import { createRoutine, promisifyRoutine } from "redux-saga-routines";
import { ApiRoutineActionsUnion } from "../utils/redux";


//UPDATE TICKET
const makeUpdateTicket = <T>() => ({
	trigger: (payload: T) => payload,
	success: (payload: any) => payload,
	failure: (payload: T) => payload
});

export const updateTicketRoutine = createRoutine("TICKETING/UPDATE_TICKET", makeUpdateTicket<PendingPurchasedToken>());
export const updateTicketPromise = promisifyRoutine(updateTicketRoutine);
export type TUpdateTicketRoutine = ApiRoutineActionsUnion<typeof updateTicketRoutine>;