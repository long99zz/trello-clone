import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Group } from '@mui/icons-material'
import { Comment } from '@mui/icons-material'
import { Attachment } from '@mui/icons-material'

function Card({ card }) {
    return (
        <MuiCard sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0 0 0 0.2)',
            overflow: 'unset'

        }}>
            {card?.cover &&
                <CardMedia
                    sx={{ height: 140 }}
                    image={card?.cover}
                    title="green iguana"
                />
            }
            <CardContent sx={{
                p: 1.5,
                '&:last-child': {
                    p: 1.5
                }
            }}>
                <Typography>{card?.title}</Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                {!!card?.memberIds?.length && <Button size="small" startIcon={<Group />}>{card?.memberIds?.length}</Button>}
                {!!card?.comments?.length && <Button size="small" startIcon={<Comment />}>{card?.comments?.length}</Button>}
                {!!card?.attachments?.length && <Button size="small" startIcon={<Attachment />}>{card?.attachments?.length}</Button>}

            </CardActions>
        </MuiCard>
    )
}

export default Card