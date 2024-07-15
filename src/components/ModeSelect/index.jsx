
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
        <FormControl sx={{ m: 1, minWidth: '100 %' }} size='small'>
            <InputLabel id="lable-select-dark-light-mode">Mode</InputLabel>
            <Select
                labelId="lable-select-dark-light-mode"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
            >
                <MenuItem value="light">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LightMode fontSize='small' /> Light
                    </div>
                </MenuItem>
                <MenuItem value="dark">
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                        <DarkModeOutlined fontSize='small' /> Dark
                    </Box>
                </MenuItem>
                <MenuItem value="system">
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '2' }}>
                        <SettingsBrightness fontSize='small' /> System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModeSelect