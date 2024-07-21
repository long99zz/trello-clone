import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import Apps from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNone from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutline from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import { Close, LibraryAdd, Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { useState } from 'react'

function AppBar() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <Box px={2} sx={{
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Apps sx={{ color: 'white' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
                    <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '1' }}>
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />

                    <Button sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }} variant="outlined" startIcon={<LibraryAdd />}>Create</Button>
                </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="search"
                    size='small'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: searchValue && (
                            <Close
                                fontSize='small'
                                sx={{ color: 'white', cursor: 'pointer' }}
                                onClick={() => setSearchValue('')} />
                        )
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '170px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset ': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }

                        },
                        '& input[type=search]::-webkit-search-cancel-button': {
                            '-webkit-appearance': 'none',
                            appearance: 'none',
                        }
                    }} />
                <ModeSelect />
                <Tooltip title='Notification'>
                    <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNone sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title='Help'>
                    <HelpOutline sx={{ cursor: 'pointer', color: 'white' }} />
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar