
import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightMode from '@mui/icons-material/LightMode'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
    const { mode, setMode } = useColorScheme()
    const handleChange = (event) => {
        const selectedMode = event.target.value
        setMode(selectedMode)
    }
    return (
        <FormControl size='small' sx={{ minWidth: '120px' }}>
            <InputLabel
                id="lable-select-dark-light-mode"
                sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' }
                }}>Mode</InputLabel>
            <Select
                labelId="lable-select-dark-light-mode"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '.MuiSvgIcon-root': { color: 'white' }

                }}
            >
                <MenuItem value="light">
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LightMode fontSize='small' /> Light
                    </Box>
                </MenuItem>
                <MenuItem value="dark">
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                        <DarkModeOutlined fontSize='small' /> Dark
                    </Box>
                </MenuItem>
                <MenuItem value="system">
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                        <SettingsBrightness fontSize='small' /> System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModeSelect