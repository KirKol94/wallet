import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoodBadIcon from '@mui/icons-material/MoodBad';

export default function SimpleBottomNavigation(props) {
	const [value, setValue] = React.useState(1);

	return (
		<Box sx={{width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0}}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction onClick={() => {
					props.setShowIncome(true)
					props.setShowExpense(false)
					props.setShowCommonPage(false)
				}} label="Доходы" icon={<MonetizationOnIcon/>}/>
				<BottomNavigationAction onClick={() => {
					props.setShowCommonPage(true)
					props.setShowIncome(false)
					props.setShowExpense(false)
				}} label="Общее" icon={<EqualizerIcon/>}/>
				<BottomNavigationAction onClick={() => {
					props.setShowExpense(true)
					props.setShowIncome(false)
					props.setShowCommonPage(false)
				}} label="Расходы" icon={<MoodBadIcon/>}/>
			</BottomNavigation>
		</Box>
	);
}
