import axios from 'axios';
const GAME_MAP_URL = `${process.env.REACT_APP_API_BASE}/getGameMap`;
const GAME_LIST_URL = `${process.env.REACT_APP_API_BASE}/getGameList`;
const VALIDATE_URL = `${process.env.REACT_APP_API_BASE}/validate`;
const INITIAL_MAP_URL = `${process.env.REACT_APP_API_BASE}/getInitialMap`;
const SAVE_MAP_URL = `${process.env.REACT_APP_API_BASE}/saveMap`;
const HINT_MOVE_URL = `${process.env.REACT_APP_API_BASE}/hintMove`;
// const LOGOUT_API_URL = (sessionId) => `${process.env.REACT_APP_API_BASE}/user/logout?sessionId=${sessionId}`;

// actions
var getMap = (nodes,edges) => {
	return axios.post(GAME_MAP_URL, {nodes,edges});
}

var getList = (gameType,initialNode,gameTreeMap,gameStart) => {
	return axios.post(GAME_LIST_URL, {gameType,initialNode,gameTreeMap,gameStart});
}

var validate = (initialNode,gameTreeList,nodes,edges,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType,playedGameNodes) => {
	return axios.post(VALIDATE_URL, {initialNode,gameTreeList,nodes,edges,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType,playedGameNodes});
}

var getInitial = () => {
	return axios.get(INITIAL_MAP_URL);
}

var save = (nodes,edges) => {
	return axios.post(SAVE_MAP_URL, {nodes,edges});
}

var hint = (initialNode,gameTreeList,nodes, edges,gameStart) => {
	return axios.post(HINT_MOVE_URL, {initialNode,gameTreeList,nodes, edges,gameStart});
}

export const getGameMap = (nodes,edges) => {
	return dispatch => {
		dispatch({
			type: 'GAME_MAP',
			payload: getMap(nodes,edges)
		})

	}
}

export const getGameList = (gameType,initialNode,gameTreeMap,gameStart) => {
	return dispatch => {
		dispatch({
			type: 'GAME_LIST',
			payload: getList(gameType,initialNode,gameTreeMap,gameStart)
		})

	}
}

export const validateMove = (initialNode,gameTreeList,nodes,edges,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType,playedGameNodes) => {
	return dispatch => {
		dispatch({
			type: 'VALIDATE_MOVE_RESULT',
			payload: validate(initialNode,gameTreeList,nodes,edges,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType,playedGameNodes)
		})

	}
}

export const getInitialMap = () => {
	return dispatch => {
		dispatch({
			type: 'INITIAL_MAP',
			payload: getInitial()
		})

	}
}

export const saveMap = (nodes,edges) => {
	return dispatch => {
		dispatch({
			type: 'SAVE_MAP',
			payload: save(nodes,edges)
		})

	}
}

export const hintMove = (initialNode,gameTreeList,nodes, edges,gameStart) => {
	return dispatch => {
		dispatch({
			type: 'HINT_MOVE',
			payload: hint(initialNode,gameTreeList,nodes, edges, gameStart)
		})

	}
}


