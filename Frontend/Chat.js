import React,{useState,useRef} from 'react'
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField } from '@material-ui/core';
import Messages from './Messages';
import Helps from './Helps';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
    root: {
        width: isMobile ? '90%' : 400,
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
      
     
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        minHeight:'5vh',
        color: 'white',
        background: '#1E212B',
        alignItems:'center',
        
    },
    view: {
        flex: 1,
        display: 'flex',
        background: '#FFFFFF',
        flexDirection: 'column',
        overflowY: 'scroll',
        paddingBottom: '20px',
        paddingTop: '20px',
        maxHeight:'80vh',
        
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTop: "1px solid lightgray"
      
    },
    inputBox: {
        flex: 1,
        paddingInline:10,
    }
});



function Chat() {
    const classes = useStyles();
    const [message, setMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [helpsOpen,setHelpsOpen]=useState(false)
    const [theArray, setTheArray] = useState([
        [{
            'message': 'Soy un Bot al que le puedes pedir los horarios, el menu y la ubicación de la tienda.',
            id: 'bot777'
        }],
        [{
            'message': 'Puedes usar los mensajes predeterminados o escribir uno tu mismo!',
            id: 'bot777'
        }]
    ]);
    const dummy=useRef()

    const onSend = async (e) => {
        e.preventDefault()
        setSending(true)
        setMessage("")
        var res=await fetch("/chatbot",{
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({'message':message})
        })
        var data = await res.json()

        setTheArray([...theArray, [
            { "message": message, 'id': '12345' },
            data
        ]]);
        setSending(false)
        dummy.current.scrollIntoView({behavior:'smooth'})

    }

    return (
        <Paper className={classes.root} elevation={5}>
            <div className={classes.header}>
                <h3>Chatbot Tienda Galletas</h3>
            </div>
            <div className={classes.view}>
                {theArray.map((msgRes,_i) => (
                    <Messages key={_i}msgRes={msgRes}/>
                ))}
            <div ref={dummy}></div>
            </div>
            <div>
                <form className={classes.input}>
                    <Helps setMessage={setMessage} setHelpsOpen={setHelpsOpen}/>
                    <TextField
                            className={classes.inputBox}
                            type="text"
                            placeholder="Escibe un mensaje..."
                           
                            variant="outlined"
                            value={message}
                            onChange={(e) => {setMessage(e.target.value)}}
                            style={{display:helpsOpen?'none':null}}
                        />
                    <Button
                            color="#11111"
                            type="submit"
                            variant="contained"
                            onClick={onSend}
                            disabled={sending}
                         endIcon={<SendIcon/>}
                        style={{
                            display: helpsOpen ? 'none' : null,
                            backgroundColor: "#1e212b",
                            color:'#ffff'
                        }}  
                        >{sending?"Sending":"Send"}
                        </Button>
                </form>
                    
                
                
            </div>
        </Paper>
    )
}

export default Chat
