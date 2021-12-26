import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"

function App() {
	const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:5000")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
	
		},
		[ chat ]
	)
console.log(chat)
	const onMessageSubmit = (e) => {
		e.preventDefault()
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		setState({ message: "", name })
	}


	return (
		<div className="card" >
			<div className="render-chat">
				<h1>messages</h1>
				{chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))}
			</div>
				
			<form onSubmit={onMessageSubmit}>
				<div className="name-field">
					<TextField  name="name" onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} value={state.name} label="Name" />
				</div>
				<div>
					<TextField
				
						name="message"
						onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
		</div>
	)
}

export default App

