import { Component } from 'react'
import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    height: 100%;
    padding: 8px;
    margin-right: 8px;
`
class TrelloList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cards = this.props.cards;

        const cardsEle = cards.map((card, index) => {
            return <TrelloCard text={card.text} key={card.id} index={index} id={card.id}></TrelloCard>
        })

        return (
            <Draggable draggableId={String(this.props.listID)} index={this.props.index}>
                {provided => (
                    <ListContainer {...provided.draggableProps}
                        ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Droppable droppableId={String(this.props.listID)}>
                            {
                                provided => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        <h4>{this.props.title}</h4>
                                        {cardsEle}
                                        {provided.placeholder}
                                        <TrelloActionButton listID={this.props.listID}></TrelloActionButton>
                                    </div>
                                )
                            }
                        </Droppable>
                    </ListContainer>
                )}
            </Draggable>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        height: "100%",
        padding: 8,
        marginRight: 8
    }
}

export default TrelloList;