import React from "react";

export default function CommonPage(props) {
	return (
		<div style={{display:'flex', flexDirection:'column', justifyContent:'center', minHeight:'100vh'}}>
			<div style={{display:'flex', justifyContent:'space-between'}}><h1>Доход</h1><h1>{props.incomeCount}</h1></div>
			<div style={{display:'flex', justifyContent:'space-between'}}><h1>Расход</h1><h1>{props.expenseCount}</h1></div>
			<div style={{display:'flex', justifyContent:'space-between'}}><h1>Профит</h1><h1>{props.incomeCount - props.expenseCount}</h1></div>
		</div>
	)
}