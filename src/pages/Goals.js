import {Container} from "react-bootstrap"
import '../App.css';
import AddGoal from '../components/Goals/AddGoal';
import GoalList from '../components/Goals/GoalList';

function Goals() {

    return (
        <div className='dash'>
            <Container>
                <AddGoal />
                <Container>
                    <GoalList />
                </Container>                    
            </Container>
        </div>
    )
}

export default Goals
