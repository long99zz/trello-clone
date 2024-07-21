import { AddToDrive, Bolt, Dashboard, FilterList, VpnLock } from '@mui/icons-material'
import { Chip, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import PersonAdd from '@mui/icons-material/PersonAdd'
import theme from '~/theme'

const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }

}
function BoardBar() {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
            borderBottom: '1px solid white'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={MENU_STYLES}
                    icon={<Dashboard />}
                    label="Nguyen Ba Hoang Long Board"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLock />}
                    label="Public/Private Workspace"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDrive />}
                    label="Add to Google Drive"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<Bolt />}
                    label="Automation"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterList />}
                    label="Filters"
                    clickable
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="outlined" startIcon={<PersonAdd />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': { borderColor: 'white' }
                    }}    >Invite</Button>
                <AvatarGroup
                    max={7}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16
                        }
                    }}
                >
                    <Tooltip>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </Tooltip>
                    <Tooltip>
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </Tooltip>
                </AvatarGroup>
            </Box>

        </Box >
    )
}

export default BoardBar