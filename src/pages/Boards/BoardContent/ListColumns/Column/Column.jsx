import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Tooltip } from '@mui/material'
import { AddCard, DeleteForever, DragHandle, Opacity } from '@mui/icons-material'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Column({ column }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: column._id, data: { ...column } })
    const dndKitColumnStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
    }
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
    return (
        <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes} >
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight}-${theme.spacing(5)})`
                }}>
                <Box sx={{
                    height: (theme) => theme.trello.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant='h6' sx={{
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title="More options">
                            <ExpandMore
                                sx={{ color: 'text.primary', cursor: 'pointer' }}
                                id="basic-column-dropdown"
                                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>

                        <Menu
                            id="basic-menu-workspaces"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-workspaces',
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCard fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopy fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPaste fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>

                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForever fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Delete this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                <ListCards cards={orderedCards} />

                <Box sx={{
                    height: (theme) => theme.trello.columnFooterHeight,
                    px: 2,
                    mb: 2,
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddCard />}
                        sx={{
                            flexGrow: 1,
                            color: 'text.primary',
                            borderColor: 'text.primary',
                            textTransform: 'none',
                            '&:hover': {
                                color: 'text.primary',
                                borderColor: 'text.primary'
                            }
                        }}
                    >
                        Add card
                    </Button>
                    <DragHandle sx={{ color: 'text.primary', cursor: 'pointer', ml: 1 }} />
                </Box>
            </Box>
        </div>
    )
}

export default Column
