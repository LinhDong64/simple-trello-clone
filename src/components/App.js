import { Component } from 'react'
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from '../actions'
import styled from 'styled-components'

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))
  }

  render() {
    const { lists } = this.props;
    const trelloListEle = lists.map((list, index) => {
      return <TrelloList listID={list.id} title={list.title} cards={list.cards} key={list.id} index={index}></TrelloList>
    })

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h2>Hello World</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListContainer {...provided.droppableProps}
               ref={provided.innerRef}>
                {trelloListEle}
                {provided.placeholder}
                <TrelloActionButton list></TrelloActionButton>
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row"
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
