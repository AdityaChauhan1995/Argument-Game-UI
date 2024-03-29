import React, {useState, Fragment, Component} from 'react';
import { Input,Dropdown,Message,Dimmer, Header, Icon,Checkbox  } from "semantic-ui-react";
import { useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, useReactFlow } from 'react-flow-renderer';

// import defaultNodes from './nodes.js';
import defaultGameNodes from './gameNode.js';
// import defaultEdges from './edges.js';
import defaultGameEdges from './gameEdge.js';
import './button.css';


//redux
import { connect } from 'react-redux';
import { getGameMap,getGameList,validateMove,getInitialMap,saveMap,hintMove } from '../actions/UserActions';
import ErrorMessage from "../components/show-error";


const edgeOptions = {
  animated: false,
  style: {
    stroke: 'black',
  },
};

const connectionLineStyle = { stroke: 'black' };
let nodeId = 0;

const Flow = ({defaultNodes,defaultEdges,addMapNodeDisabled}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    var count = reactFlowInstance.getNodes().length;
    console.log('count',count);
    var tempId = 0;
    if(count != 0){
      tempId = reactFlowInstance.getNodes()[count-1].id;
      tempId = parseInt(tempId);
    }
    const id = `${++tempId}`;
    const newNode = {
      id,
      position: {
        // x: Math.random() * 500,
        // y: 0.25 * 500,
        x: Math.floor(Math.random() * (500 - 300 + 1) ) + 300,
        y:  Math.floor(Math.random() * (250 - 150 + 1) ) + 150,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
    
  }, []);

  return (
    <React.Fragment>
      <button onClick={onClick} className="btn-add" disabled={addMapNodeDisabled}>
       Add Node
     </button>
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      defaultEdgeOptions={edgeOptions}
      fitView
      style={{
        backgroundColor: '#D3D2E5',
      }}
      connectionLineStyle={connectionLineStyle}
    />
      </React.Fragment>
  );
}

const Save = ({saveMap,saveDisabled}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    saveMap(reactFlowInstance.getNodes(),reactFlowInstance.getEdges());
  }, []);

  return (
    <React.Fragment>
     <button onClick={onClick} className="btn-add2" disabled={saveDisabled}>
       <Icon name='save'/>Save
     </button>
      </React.Fragment>
  );
}

const ResetMap = ({defaultNodes, defaultEdges,resetMapDisabled,resetMap}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    reactFlowInstance.setNodes(defaultNodes);
    reactFlowInstance.setEdges(defaultEdges)
    nodeId = 0;
    resetMap();
  }, []);

  return (
    <React.Fragment>
     <button onClick={onClick} className="btn-add4" disabled={resetMapDisabled}>
       <Icon name='undo' size='small'/>Reset
     </button>
      </React.Fragment>
  );
}

const Remove = ({removeNode,removeDisabled}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = removeNode => () => {
    if(removeNode != undefined && removeNode != null && removeNode != ''){
      console.log(typeof(removeNode),'removeNode',removeNode)
      var tempNodes = reactFlowInstance.getNodes().filter((x) => {
        return x.id !== removeNode
      });
      var tempEdges = reactFlowInstance.getEdges().filter((x) => {
        return (x.source !== removeNode && x.target !== removeNode)
      });
      reactFlowInstance.setNodes(tempNodes);
      reactFlowInstance.setEdges(tempEdges);
      // nodeId = 2;
    }
  };

  return (
    <React.Fragment>
     <button onClick={onClick(removeNode)} className="btn-add8" disabled={removeDisabled}>
     <Icon name='trash' size='small'/>Remove
     </button>
      </React.Fragment>
  );
}

const PlayGame = ({playGameFunction,playGameDisabled}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    playGameFunction(reactFlowInstance.getNodes(),reactFlowInstance.getEdges());
    // console.log('getNodes',JSON.stringify(reactFlowInstance.getNodes()),'getEdges',JSON.stringify(reactFlowInstance.getEdges()))
  }, []);

  return (
    <React.Fragment>
     <button onClick={onClick} className="btn-add3" disabled={playGameDisabled}>
     <Icon name='play'/>Game
     </button>
      </React.Fragment>
  );
}

const PlayFlow = ({}) => {
  const reactFlowInstance = useReactFlow();
  return (
    <React.Fragment>
      {/* <button onClick={onClick(value)} className="btn-add5">
       Add
     </button> */}
    <ReactFlow
       defaultNodes={defaultGameNodes}
       defaultEdges={defaultGameEdges}
      defaultEdgeOptions={edgeOptions}
      fitView
      style={{
        backgroundColor: '#f4b1b1',
      }}
      connectionLineStyle={connectionLineStyle}
    />
      </React.Fragment>
  );
}

const AddNodeGame = ({value,addbutton,addGameNodeDisabled}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = value => () => {
    if(value != undefined && value != null && value != ''){
    var tempNodes = reactFlowInstance.getNodes().filter((x) => {
      return (x.id).split('(')[0] == value
		});
    var id = value ;
    if(tempNodes.length != 0){
      id = value + '('+ (tempNodes.length+1) + ')'
    }
    
    console.log('typeof',typeof(id),'id', id)
    const gameNode = {
      id,
      position: {
        // x: Math.random() * 500,
        // y: 0.25 * 500,
        x: Math.floor(Math.random() * (500 - 300 + 1) ) + 300,
        y:  Math.floor(Math.random() * (250 - 150 + 1) ) + 150,
      },
      data: {
        label: `Node ${id}`
      },
    };
    console.log('gameNode', gameNode);
    reactFlowInstance.addNodes(gameNode);
    console.log(reactFlowInstance.getEdges());
    addbutton(gameNode);
    }
  };

  return (
    <React.Fragment>
     <button onClick={onClick(value)} className="btn-add5" disabled={addGameNodeDisabled}>
      <Icon name='add'/>
     </button>
      </React.Fragment>
  );
}

const ResetGame = ({resetGame,resetGameDisabled,resetMapClicked}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    reactFlowInstance.setNodes(defaultGameNodes);
    reactFlowInstance.setEdges(defaultGameEdges);
    resetGame();
  }, []);
  if(resetMapClicked){
    reactFlowInstance.setNodes(defaultGameNodes);
    reactFlowInstance.setEdges(defaultGameEdges);
    resetGame();
  }
  return (
    <React.Fragment>  
     <button onClick={onClick} className="btn-add6" disabled={resetGameDisabled}>
      <Icon name='undo'/>
     </button>
      </React.Fragment>
  );
}

const Validate = ({initialNode,gameTreeList,validateMove,validateMoveClicked,validateMoveResult, 
  validationFinished, proponentWinCount, opponentWinCount,lastAddedNode,validateDisabled,gameStart,gameType}) => {
  const reactFlowInstance = useReactFlow();
  var tempProponentWinCount = -1, tempOpponentWinCount = -1;
  // console.log('initialNode',initialNode,'gameTreeList',gameTreeList,'validateMove',validateMove);
  const onClick = (initialNode,gameTreeList,validateMove,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType) => () => {
    console.log('2',initialNode,gameTreeList)
    // alert('Invalid Move');
    // reactFlowInstance.addNodes({id: '2',data: { label: 'Node 2' }, position: { x: 250, y: 25 }});
    // reactFlowInstance.addEdges({id: 'e1-2', source: '1', target: '2'});
    validateMove(initialNode,gameTreeList,reactFlowInstance.getNodes(),reactFlowInstance.getEdges(),lastAddedNode.id, 
    proponentWinCount, opponentWinCount,gameStart,gameType);
    
  };
  console.log('validateMoveClicked',validateMoveClicked);
  console.log('validateMoveResult',validateMoveResult);
  if(validateMoveClicked){
    console.log('validateMoveResult',validateMoveResult)
    if(validateMoveResult.result){
      
    if(validateMoveResult.win == 'Game Won' || validateMoveResult.win == 'Game Over'){
      if(validateMoveResult.message != null){
          tempProponentWinCount = validateMoveResult.proponentWinCount;
          tempOpponentWinCount = validateMoveResult.opponentWinCount;
          // alert(validateMoveResult.message)
      }
    }else if(validateMoveResult.win == 'Won'){

      const id = validateMoveResult.node.id;
      const gameNode = {
        id,
        position: {
          // x: Math.random() * 500,
          // y: 0.25 * 500,
          x: Math.floor(Math.random() * (500 - 300 + 1) ) + 300,
          y:  Math.floor(Math.random() * (250 - 150 + 1) ) + 150,
        },
        data: {
          label: `Node ${id}`,
        }
      }
      reactFlowInstance.addNodes(gameNode);
      var edgePresent = false;
      var tempEdges = reactFlowInstance.getEdges();
      for (let i = 0; i < reactFlowInstance.getEdges().length; i++) {
        if(validateMoveResult.edge.source == tempEdges[i].source && validateMoveResult.edge.target == tempEdges[i].target){
          edgePresent=true;
        }
      }
      if(!edgePresent){
        reactFlowInstance.addEdges(validateMoveResult.edge);
        }
      if(validateMoveResult.message != null){
        tempProponentWinCount = validateMoveResult.proponentWinCount;
        tempOpponentWinCount = validateMoveResult.opponentWinCount;
        // alert(validateMoveResult.message)
        }
      }
    }else{
      var tempNodes = reactFlowInstance.getNodes().filter((x) => {
        return x.id !== lastAddedNode.id
      });
      var tempEdges = reactFlowInstance.getEdges().filter((x) => {
        return (x.source !== lastAddedNode.id && x.target !== lastAddedNode.id)
      });
      reactFlowInstance.setNodes(tempNodes);
      reactFlowInstance.setEdges(tempEdges);
      // alert(validateMoveResult.exceptionMessage)
    }
    validationFinished(tempProponentWinCount,tempOpponentWinCount,validateMoveResult);
  }

  return (
    <React.Fragment>
     <button onClick={onClick(initialNode,gameTreeList,validateMove,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType)} className="btn-add7" disabled={validateDisabled}>
     <Icon name='check circle outline' />Validate
     </button>
      </React.Fragment>
  );
}

const Hint = ({hint,initialNode,gameTreeList,hintDisabled,gameStart}) => {
  const reactFlowInstance = useReactFlow();
  const onClick = (hint,initialNode,gameTreeList,gameStart) => () => {
    console.log('hint initialNode', initialNode)
    hint(initialNode,gameTreeList,reactFlowInstance.getNodes(), reactFlowInstance.getEdges(),gameStart);
  };

  return (
    <React.Fragment>  
     <button onClick={onClick(hint,initialNode,gameTreeList,gameStart)} className="btn-add10" disabled={hintDisabled}>
      <Icon name='idea'/>Hint
     </button>
    </React.Fragment>
  );
}

class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      reactFlowInstance : '',
      initialNode:'',
      removeNode:'',
      gameType:'',
      gameNode:'',
      gameTreeMap:[],
      gameTreeList:[],
      validateMoveResult:[],
      validateMoveClicked:false,
      proponentWinCount:0,
      opponentWinCount:0,
      lastAddedNode:'',
      defaultNodes:[],
      defaultEdges:[],
      resultMessage:null,
      hintMessage:'',
      addMapNodeDisabled:false,
      removeDisabled:false,
      saveDisabled:false,
      resetMapDisabled:false,
      playGameDisabled:false,
      gameTypeDisabled:true,
      addGameNodeDisabled:true,
      validateDisabled:true,
      resetGameDisabled:true,
      hintDisabled:true,
      resultDisabled:true,
      resetMapClicked:false,
      gameStartDisabled:true,
      status:'Hide',
      message:'',
      showDimmer:false,
      messageColor:'blue',
      gameStart:'User',
      isGameStartChecked:false,
      infoLeftVisibility:'Hide',
      infoRightVisibility:'Hide',
      playedGameNodes:[]
    }
    this.showErr = React.createRef(); 
  }

  componentDidMount(){
    this.setState({showDimmer:true});
    this.props.getInitialMap()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.GAME_MAP_STATUS !== 'SUCCESS' && nextProps.GAME_MAP_STATUS === 'SUCCESS') {
      this.setState({ gameTreeMap: nextProps.gameTreeMap,showDimmer:false,
                      status:'Show', messageColor:'teal', message:'Let\'s play Argument Game !! ALL THE BEST :-)' });
      console.log('nextProps.gameTreeMap',nextProps.gameTreeMap);
    } else if (this.props.GAME_MAP_STATUS !== 'FAILED' && nextProps.GAME_MAP_STATUS === 'FAILED') {
      var tempMessage = 'Unable to connect to Server!! Kindly try again after some time.';
      this.setState({ status:'Show', messageColor:'red', message:tempMessage, showDimmer:false});
    }

    if (this.props.GAME_LIST_STATUS !== 'SUCCESS' && nextProps.GAME_LIST_STATUS === 'SUCCESS') {
      this.setState({ gameTreeList: nextProps.gameTreeList });
      setTimeout(() => this.setState({showDimmer:false}), 100);
      console.log('nextProps.gameTreeList',nextProps.gameTreeList);
    } else if (this.props.GAME_LIST_STATUS !== 'FAILED' && nextProps.GAME_LIST_STATUS === 'FAILED') {
      var tempMessage = 'Unable to connect to Server!! Kindly try again after some time.';
      this.setState({ status:'Show', messageColor:'red', message:tempMessage,showDimmer:false});
    }

    if (this.props.VALIDATE_MOVE_RESULT_STATUS !== 'SUCCESS' && nextProps.VALIDATE_MOVE_RESULT_STATUS === 'SUCCESS') {
      this.setState({ validateMoveResult: nextProps.validateMoveResult, proponentWinCount: nextProps.proponentWinCount, 
              opponentWinCount: nextProps.opponentWinCount},() => {this.setState({validateMoveClicked: true})});
      setTimeout(() => this.setState({showDimmer:false}), 100);
      console.log('nextProps.validateMoveResult',nextProps.validateMoveResult);
    } else if (this.props.VALIDATE_MOVE_RESULT_STATUS !== 'FAILED' && nextProps.VALIDATE_MOVE_RESULT_STATUS === 'FAILED') {
      this.setState({ validateMoveResult: nextProps.validateMoveResult}, () => {this.setState({validateMoveClicked: true})});
      setTimeout(() => this.setState({showDimmer:false}), 100);
    }

    if (this.props.INITIAL_MAP_STATUS !== 'SUCCESS' && nextProps.INITIAL_MAP_STATUS === 'SUCCESS') {
      this.setState({ showDimmer:false, defaultNodes: JSON.parse(nextProps.initialMap.nodes), defaultEdges: JSON.parse(nextProps.initialMap.edges)});
    } else if (this.props.INITIAL_MAP_STATUS !== 'FAILED' && nextProps.INITIAL_MAP_STATUS === 'FAILED') {
      var tempMessage = 'Unable to connect to Server!! Kindly try again after some time.';
      this.setState({ status:'Show', messageColor:'red', message:tempMessage,showDimmer:false});
    }

    if (this.props.SAVE_MAP_STATUS !== 'SUCCESS' && nextProps.SAVE_MAP_STATUS === 'SUCCESS') {
      var tempMessage = 'Saved Successfully !';
      this.setState({ status:'Show', messageColor:'blue', message:tempMessage,showDimmer:false});
    } else if (this.props.SAVE_MAP_STATUS !== 'FAILED' && nextProps.SAVE_MAP_STATUS === 'FAILED') {
      var tempMessage = 'Unable to connect to Server!! Kindly try again after some time.';
      this.setState({ status:'Show', messageColor:'red', message:tempMessage,showDimmer:false});
    }

    if (this.props.HINT_MOVE_STATUS !== 'SUCCESS' && nextProps.HINT_MOVE_STATUS === 'SUCCESS') {
      if(nextProps.hintMessage != null && nextProps.hintMessage.includes("No Hint Available !")){
        this.setState({ status:'Show', messageColor:'red', message:nextProps.hintMessage,hintMessage: nextProps.hintMessage});
      }else{
        this.setState({ status:'Show', messageColor:'blue', message:nextProps.hintMessage,hintMessage: nextProps.hintMessage});
      }
      setTimeout(() => this.setState({showDimmer:false}), 100);
    } else if (this.props.HINT_MOVE_STATUS !== 'FAILED' && nextProps.HINT_MOVE_STATUS === 'FAILED') {
      var tempMessage = 'Unable to connect to Server!! Kindly try again after some time.';
      this.setState({ status:'Show', messageColor:'red', message:tempMessage});
      setTimeout(() => this.setState({showDimmer:false}), 100);
    }

  }

  saveMap = (nodes,edges) => {
    // const { email, password } = this.state;
    // this.setState({ loading: true });
    // const reactFlowInstance = useReactFlow();
    var temp = JSON.stringify(nodes);
    console.log('nodes',JSON.stringify(nodes), 'edges', JSON.stringify(edges), 'nodesParse', JSON.parse(temp));
    // this.setState({reactFlowInstance:edges} , () => ("this.state.reactFlowInstance",console.log(this.state.reactFlowInstance)) );
    console.log('gameType',this.state.gameType);
    this.setState({showDimmer:true});
    this.props.saveMap(JSON.stringify(nodes), JSON.stringify(edges));
  }

  playGameFunction = (nodes,edges) => {
    console.log('playGameFunction', nodes, edges);
    if(nodes == undefined || nodes == null || nodes.length < 1){
      this.setState({ status:'Show', messageColor:'red', message:'Kindly add atleast one node to the Argument design Framework'});
    }else{
      this.setState({initialNode:null,addMapNodeDisabled:true, removeDisabled:true, playGameDisabled:true, gameTypeDisabled:false,
        resetGameDisabled:false,removeNode:'',showDimmer:true, playedGameNodes:nodes});
     console.log('nodes',nodes,'edges',edges)
     this.props.getGameMap(nodes,edges);
    }
  }

  addbutton = (gameNode) => {
    let {initialNode,gameTreeMap,gameType,gameStart} = this.state;
    if(initialNode == null){
      if(gameStart == 'User'){
        this.setState({initialNode:gameNode.id, lastAddedNode:gameNode,validateDisabled:false,gameTypeDisabled:true,
          addGameNodeDisabled:true,hintDisabled:true,showDimmer:true,gameStartDisabled:true})
      }else{
        this.setState({initialNode:gameNode.id, lastAddedNode:gameNode,validateDisabled:true,gameTypeDisabled:true,
          addGameNodeDisabled:false,hintDisabled:false,showDimmer:true,gameStartDisabled:true})
      }
      
      this.props.getGameList(gameType,gameNode.id,gameTreeMap,gameStart);
      console.log('initialNode',initialNode)
    }else{
      this.setState({lastAddedNode:gameNode,validateDisabled:false,addGameNodeDisabled:true,
                     hintDisabled:true})
    }
  }

  validateMove = (initialNode,gameTreeList,nodes,edges,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType) => {
    this.setState({showDimmer:true});
    this.props.validateMove(initialNode,gameTreeList,nodes,edges,lastAddedNode,proponentWinCount,opponentWinCount,gameStart,gameType,this.state.playedGameNodes);
    console.log('this.state.validateMoveClicked', this.state.validateMoveClicked)
  
  }

  validationFinished = (tempProponentWinCount,tempOpponentWinCount,validateMoveResult) => {
    if(tempProponentWinCount !== -1 && tempOpponentWinCount !== -1){
      this.setState({validateMoveClicked:false, proponentWinCount:tempProponentWinCount, opponentWinCount:tempOpponentWinCount});
    }else{
      this.setState({validateMoveClicked:false});
    }
    if(validateMoveResult.message != null){
      this.setState({resultMessage:validateMoveResult.message});
      }
    this.setState({validateDisabled:true,hintDisabled:false,addGameNodeDisabled:false,resultDisabled:false});
    if(validateMoveResult.result){
      if(validateMoveResult.win == 'Game Won' || validateMoveResult.win == 'Game Over'){
        if(validateMoveResult.message != null){
          if(validateMoveResult.message.includes("Game Finished but no winning strategy found.")){
            this.setState({ status:'Show', messageColor:'red', message:validateMoveResult.message});
          }else{
            this.setState({ status:'Show', messageColor:'blue', message:validateMoveResult.message});
          }
        }
      }else if(validateMoveResult.win == 'Won'){
        if(validateMoveResult.message != null){
          if(validateMoveResult.message.includes("Game Finished but no winning strategy found.")){
            this.setState({ status:'Show', messageColor:'red', message:validateMoveResult.message});
          }else{
            this.setState({ status:'Show', messageColor:'blue', message:validateMoveResult.message});
          }
        }
      }
    }else{
      this.setState({ status:'Show', messageColor:'red', message:validateMoveResult.exceptionMessage});
    }
  }

  resetGame = () => {
    if(this.state.resetMapClicked){
      this.setState({initialNode:null,proponentWinCount:0,opponentWinCount:0, resultMessage:null, resetMapClicked:false,
        gameType:'', gameNode:'',gameTypeDisabled:true,addGameNodeDisabled:true,gameStart:'User',isGameStartChecked:false,
        gameStartDisabled:true});
    }else{
      this.setState({initialNode:null,proponentWinCount:0,opponentWinCount:0, resultMessage:null, resetMapClicked:false,
        gameType:'', gameNode:'',gameTypeDisabled:false,addGameNodeDisabled:true,gameStart:'User',isGameStartChecked:false,
        gameStartDisabled:true });
    }
  }

  resetMap = () => {
    this.setState({initialNode:null,proponentWinCount:0,opponentWinCount:0, resultMessage:null, resetMapClicked:true,
        addMapNodeDisabled:false,removeDisabled:false,saveDisabled:false,resetMapDisabled:false,playGameDisabled:false,
        gameTypeDisabled:true,addGameNodeDisabled:true,validateDisabled:true,resetGameDisabled:true,hintDisabled:true,
        resultDisabled:true,gameType:'', gameNode:'',removeNode:'',gameStart:'User',isGameStartChecked:false,
        gameStartDisabled:true,playedGameNodes:[] });
  }
  
  handleChange = (e, { name, value, type }) => {
      console.log('name', name, 'value', value);
      this.setState({ [name]: value }, () => {console.log('this.state.initialNode',this.state.initialNode)});
      if(name == 'gameType'){
        this.setState({addGameNodeDisabled:false,gameStartDisabled:false});
      }
  }

  handleChangeCheckBox = (e, { name, checked }) => {
		if (name === 'gameStart') {
			// this.setState({ [name]: checked }, () => {console.log('checked',checked)});
      console.log('checked',checked)
      if(checked){
        this.setState({gameStart: 'Computer',isGameStartChecked:checked});
      }else{
        this.setState({gameStart: 'User',isGameStartChecked:checked});
      }
		}
	}

  showResult = () => {
    let {resultMessage} = this.state;
    if(resultMessage == null){
      var tempMessage = 'No winning strategy so far';
      this.setState({ status:'Show', messageColor:'red', message:tempMessage});
    }else{
        if(resultMessage.includes("Game Finished but no winning strategy found.")){
          this.setState({ status:'Show', messageColor:'red', message:resultMessage});
        }else{
          this.setState({ status:'Show', messageColor:'blue', message:resultMessage});
        }
    }
  }  

  hint = (initialNode,gameTreeList,nodes, edges,gameStart) => {
    console.log(initialNode,gameTreeList,nodes, edges)
    this.setState({showDimmer:true});
    this.props.hintMove(initialNode,gameTreeList,nodes, edges,gameStart)
  }
  
  infoLeft = () => {
    var tempMessage = "Argument Design Framework \n\n 1) Add Node - New nodes added to the screen." +
    "\n 2) Remove - Type in the node number & click Remove Button to erase it."+
    "\n 3) Save - Saving the argument design framework."+
    "\n 4) Reset - Erase the entire framework."+
    "\n 5) Play Game - Begin playing argument Game on the right panel."+
    "\n\n Framework's functionality \n\n User can add nodes and design the framework by connecting different nodes. "+
    "Each node has two points i.e. head and tail and a connection can only be established b/w two nodes "+
    "when head of one node is attached to the tail of the other node. Once the framework is finalised "+
    "then user can save it, saving framework will keep it intact even if the game window is closed. "+
    "Removal of a specific node is possible via mentioning the node number and clicking on the Remove button. "+
    "Also, user can reset the whole framework via Reset Button. After the framework is finalised, User can start "+
    "playing argument game by clicking on Play button.\n";
    this.setState({infoLeftVisibility:'Show',messageColor:'purple',message:tempMessage });
  }

  infoRight = () => {
    var tempMessage = "Argument Games \n\n 1) Game Type - Choose between preferred and grounded game." +
    "\n 2) Add button - Enter node no & click plus button to add node."+
    "\n 3) Computer Start checkbox - Computer can begin the arg game."+
    "\n 4) Validate - User's move of adding and connecting node will be validated and next move is played by the opponent/computer."+
    "\n 5) Hint - Next best move is hinted for the user i.e. Proponent."+
    "\n 6) Result - Winning Stratergy so far."+
    "\n 7) Reset - Erase the game played so far."+
    "\n\n Game's functionality \n\n User need to select the game type from the dropdown in order to proceed further.Once "+
    "game type is selected user can either start by adding the node via plus button or user can choose the "+
    "opponent to begin by checking the 'Computer Start' checkbox and adding the initial node on opponent's behalf followed by the "+
    "proponent's own move. After the proponent's move, it needs to be validated via validate button. If it's a valid move then "+
    "opponent's move is added to the game else 'Invalid Move' is displayed. If a winning Stratergy is obtained then it is displayed after "+
    "validating the move. User can receive hint to reach the winning stratergy faster. Result button displayes the winning stratergies so far. "+
    "And Reset button will erase the game played so far.";
    this.setState({infoRightVisibility:'Show',messageColor:'purple',message:tempMessage });
  }

  render() {
    let {initialNode,removeNode,gameType,gameNode,gameTreeList,defaultNodes,defaultEdges,resetMapClicked,gameStartDisabled,infoLeftVisibility,
         validateMoveClicked,validateMoveResult,proponentWinCount,opponentWinCount, lastAddedNode,showDimmer,gameStart,infoRightVisibility,
         saveDisabled,resetMapDisabled,playGameDisabled,gameTypeDisabled,resultDisabled,removeDisabled,messageColor,isGameStartChecked,
         addGameNodeDisabled,validateDisabled,resetGameDisabled,hintDisabled,addMapNodeDisabled,status,message} = this.state;
    const options = [
      { key: 'Preferred', text: 'Preferred', value: 'Preferred' },
      { key: 'Grounded', text: 'Grounded', value: 'Grounded' }
    ]
    return (
    <React.Fragment>

    <Dimmer active={showDimmer} page={true}>
        <Header as='h4' icon inverted>
            <Icon name='spinner' loading={true} />
              Please wait, we are processing your request..
		    </Header>
    </Dimmer>  

    <div class="split left">
      <Input placeholder='Node' name='removeNode' value={removeNode} type='Number' 
      onChange={this.handleChange} style={{ width:80,marginTop:-10, marginLeft:155}}/>
      <div class="infoCircle1">
        <Icon name='info circle' size='big' onClick={this.infoLeft}/> 
      </div>
      <ReactFlowProvider>
        <Save saveMap={this.saveMap} saveDisabled={saveDisabled}/>
        <ResetMap defaultNodes={defaultNodes} defaultEdges={defaultEdges} resetMapDisabled={resetMapDisabled} resetMap={this.resetMap}/>
        <Remove removeNode={removeNode} removeDisabled={removeDisabled}/>
        <PlayGame playGameFunction={this.playGameFunction} playGameDisabled={playGameDisabled}/>
        <Flow defaultNodes={defaultNodes} defaultEdges={defaultEdges} addMapNodeDisabled={addMapNodeDisabled}/>
    </ReactFlowProvider>
     
    </div>

    <div class="split right">
    <Input placeholder='Node' name='gameNode' value={gameNode} type='Number' 
      onChange={this.handleChange} style={{ width:80,marginTop:-10, marginLeft:205}}/>
    <Dropdown placeholder='Game Type' name='gameType' value={gameType} options={options} onChange={this.handleChange} 
      selection style={{ width:60,marginTop:-10, marginLeft:-280}} disabled={gameTypeDisabled}/>
    <button onClick={this.showResult} className="btn-add9" disabled={resultDisabled}>
       Result
    </button>
    <div class="checkboxComputer">
      <Checkbox onClick={this.handleChangeCheckBox} name='gameStart' checked={isGameStartChecked} disabled={gameStartDisabled} />
      <label className="labelStyle">Computer Starts</label>
    </div>
    <div class="infoCircle2">
        <Icon name='info circle' size='big' onClick={this.infoRight}/> 
      </div>
    <ReactFlowProvider>
      <PlayFlow  /> 
      <AddNodeGame value={gameNode} addbutton={this.addbutton} addGameNodeDisabled={addGameNodeDisabled}/>
      <ResetGame resetGame={this.resetGame} resetGameDisabled={resetGameDisabled} resetMapClicked={resetMapClicked}/>
      <Hint hint={this.hint} initialNode={initialNode} gameTreeList={gameTreeList} hintDisabled={hintDisabled} gameStart={gameStart}/>
      <Validate initialNode={initialNode} gameTreeList={gameTreeList} validateMove={this.validateMove} gameStart={gameStart}
        validateMoveClicked={validateMoveClicked} validateMoveResult={validateMoveResult} lastAddedNode={lastAddedNode}
        validationFinished={this.validationFinished} proponentWinCount={proponentWinCount} opponentWinCount={opponentWinCount}
        validateDisabled={validateDisabled} gameType={gameType}/>
    </ReactFlowProvider>
    </div>

    <div>
      {
        (status === 'Show') &&
        <div class="messageDisplayed"> 
        <Message color={messageColor} size='big' compact style={{ maxWidth: 800,minWidth: 800 }}
			      onDismiss={() => this.setState({ status: 'Hide' })}>
				      <Message.Header>{message}</Message.Header>
		    </Message>
        </div>
      }
      {
        (infoLeftVisibility === 'Show') &&
        <div class="infoLeftCSS"> 
        <Message color={messageColor} size='big' compact style={{ maxWidth: 650,minWidth: 650 }}
			      onDismiss={() => this.setState({ infoLeftVisibility: 'Hide' })}>
				      <Message.Header>{message}</Message.Header>
		    </Message>
        </div>
      }
      {
        (infoRightVisibility === 'Show') &&
        <div class="infoRightCSS"> 
        <Message color={messageColor} size='big' compact style={{ maxWidth: 650,minWidth: 650 }}
			      onDismiss={() => this.setState({ infoRightVisibility: 'Hide' })}>
				      <Message.Header>{message}</Message.Header>
		    </Message>
        </div>
      }
    </div>
    </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    GAME_MAP_STATUS: state.user.meta.GAME_MAP_STATUS,
    GAME_LIST_STATUS: state.user.meta.GAME_LIST_STATUS,
    VALIDATE_MOVE_RESULT_STATUS: state.user.meta.VALIDATE_MOVE_RESULT_STATUS,
    INITIAL_MAP_STATUS: state.user.meta.INITIAL_MAP_STATUS,
    SAVE_MAP_STATUS: state.user.meta.SAVE_MAP_STATUS,
    HINT_MOVE_STATUS: state.user.meta.HINT_MOVE_STATUS,
    sessionId: state.user.data.sessionId,
    gameTreeMap: state.user.data.gameTreeMap,
    gameTreeList: state.user.data.gameTreeList,
    validateMoveResult: state.user.data.validateMoveResult,
    saveMapResult: state.user.data.saveMapResult,
    initialMap: state.user.data.initialMap,
    hintMessage: state.user.data.hintMessage
  }
}

const mapDispatchToProps = {
  getGameMap,
  getGameList,
  validateMove,
  getInitialMap,
  saveMap,
  hintMove
}

//export default LoginScreen;
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)