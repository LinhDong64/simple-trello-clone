import { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const CardContainer = styled.div`
    margin-bottom: 8px;
`

class TrelloCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Draggable draggableId={String(this.props.id)} index={this.props.index}>
                {provided => (
                    <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom>
                                    {this.props.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContainer>

                )}
            </Draggable>
        )
    }
}

const styles = {
    cardContainer: {
        marginBottom: 8,
    }
}

export default TrelloCard;