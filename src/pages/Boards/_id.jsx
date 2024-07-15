
import Container from '@mui/material/Container'
import AppBar from '../../components/AppBars'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

function Board() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', width: '100vw' }}>
            <AppBar />
            <BoardBar />
            <BoardContent />
        </Container>
    )
}

export default Board