import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Group } from '@mui/icons-material'
import { Comment } from '@mui/icons-material'
import { Attachment } from '@mui/icons-material'

function Card() {
    return (
        <MuiCard sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0 0 0 0.2)',
            overflow: 'unset'

        }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent sx={{
                p: 1.5,
                '&:last-child': {
                    p: 1.5
                }
            }}>
                <Typography>Lizard</Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<Group />}>20</Button>
                <Button size="small" startIcon={<Comment />}>15</Button>
                <Button size="small" startIcon={<Attachment />}>10</Button>
            </CardActions>
        </MuiCard>
    )
}

export default Card