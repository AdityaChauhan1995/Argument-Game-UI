import { combineReducers } from 'redux';
import {
	GAME_MAP_PENDING,
	GAME_MAP_FULFILLED,
	GAME_MAP_REJECTED,
	GAME_LIST_PENDING,
	GAME_LIST_FULFILLED,
	GAME_LIST_REJECTED,
	VALIDATE_MOVE_RESULT_PENDING,
	VALIDATE_MOVE_RESULT_FULFILLED,
	VALIDATE_MOVE_RESULT_REJECTED,
	INITIAL_MAP_PENDING,
	INITIAL_MAP_FULFILLED,
	INITIAL_MAP_REJECTED,
	SAVE_MAP_PENDING,
	SAVE_MAP_FULFILLED,
	SAVE_MAP_REJECTED,
	HINT_MOVE_PENDING,
	HINT_MOVE_FULFILLED,
	HINT_MOVE_REJECTED
} from '../actions/ActionTypes';

const initialMetaState = {
	GAME_MAP_STATUS: 'DEFAULT',
	GAME_LIST_STATUS: 'DEFAULT',
	LOGOUT_STATUS: 'DEFAULT',
	VALIDATE_MOVE_RESULT_STATUS:'DEFAULT',
	INITIAL_MAP_STATUS:'DEFAULT',
	SAVE_MAP_STATUS:'DEFAULT',
	HINT_MOVE_STATUS:'DEFAULT'
}

const initialDataState = {
	sessionId: '',
	name: '',
	gameTreeMap:[],
	gameTreeList:[],
	validateMoveResult:[],
	initialMap:[],
	saveMapResult:'',
	hintMessage:''
}

function metaReducer(state=initialMetaState, action){
	// listen to only the action interested for this reducer
	switch(action.type){
		case GAME_MAP_PENDING: 
			return {...state, GAME_MAP_STATUS: 'PENDING'}
		case GAME_MAP_FULFILLED:
			return {...state, GAME_MAP_STATUS: 'SUCCESS'}
		case GAME_MAP_REJECTED:
			return {...state, GAME_MAP_STATUS: 'FAILED'}
		case VALIDATE_MOVE_RESULT_PENDING: 
			return {...state, VALIDATE_MOVE_RESULT_STATUS: 'PENDING'}
		case VALIDATE_MOVE_RESULT_FULFILLED:
			return {...state, VALIDATE_MOVE_RESULT_STATUS: 'SUCCESS'}
		case VALIDATE_MOVE_RESULT_REJECTED:
			return {...state, VALIDATE_MOVE_RESULT_STATUS: 'FAILED'}
		case GAME_LIST_PENDING: 
			return {...state, GAME_LIST_STATUS: 'PENDING'}
		case GAME_LIST_FULFILLED:
			return {...state, GAME_LIST_STATUS: 'SUCCESS'}
		case GAME_LIST_REJECTED:
			return {...state, GAME_LIST_STATUS: 'FAILED'}
		case INITIAL_MAP_PENDING: 
			return {...state, INITIAL_MAP_STATUS: 'PENDING'}
		case INITIAL_MAP_FULFILLED:
			return {...state, INITIAL_MAP_STATUS: 'SUCCESS'}
		case INITIAL_MAP_REJECTED:
			return {...state, INITIAL_MAP_STATUS: 'FAILED'}
		case SAVE_MAP_PENDING: 
			return {...state, SAVE_MAP_STATUS: 'PENDING'}
		case SAVE_MAP_FULFILLED:
			return {...state, SAVE_MAP_STATUS: 'SUCCESS'}
		case SAVE_MAP_REJECTED:
			return {...state, SAVE_MAP_STATUS: 'FAILED'}			
		case HINT_MOVE_PENDING: 
			return {...state, HINT_MOVE_STATUS: 'PENDING'}
		case HINT_MOVE_FULFILLED:
			return {...state, HINT_MOVE_STATUS: 'SUCCESS'}
		case HINT_MOVE_REJECTED:
			return {...state, HINT_MOVE_STATUS: 'FAILED'}	
		default:
			return state;	
	}
}

function dataReducer(state=initialDataState, action){
	// listen to only the action interested for this reducer
	switch(action.type){
		case GAME_MAP_FULFILLED:
		{ console.log('GAME_MAP_FULFILLED',action.payload.data);
			return {
				...state, 
				gameTreeMap:action.payload.data
			}
		}
		case GAME_LIST_FULFILLED:
			{ console.log('GAME_LIST_FULFILLED',action.payload.data);
				return {
					...state, 
					gameTreeList:action.payload.data
				}
			}
		case VALIDATE_MOVE_RESULT_FULFILLED:
			{ console.log('VALIDATE_MOVE_RESULT_FULFILLED',action.payload.data);
				return {
					...state, 
					validateMoveResult:action.payload.data
				}
			}
		case INITIAL_MAP_FULFILLED:
			{ console.log('INITIAL_MAP_FULFILLED',action.payload.data);
				return {
					...state, 
					initialMap:action.payload.data
				}
			}		
		case SAVE_MAP_FULFILLED:
			{ console.log('SAVE_MAP_FULFILLED',action.payload.data);
				return {
					...state, 
					saveMapResult:action.payload.data
				}
			}
		case HINT_MOVE_FULFILLED:
			{ console.log('HINT_MOVE_FULFILLED',action.payload.data);
				return {
					...state, 
					hintMessage:action.payload.data
				}
			}	
		default:
			return state;	
	}
}

export default combineReducers({
  meta: metaReducer,
  data: dataReducer
});