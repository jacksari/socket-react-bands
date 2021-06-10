import React, { useState, useEffect } from 'react';
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";
import { io }  from "socket.io-client";

const connectSocketServer = () => {
    return io.connect('http://localhost:8080', {
        transports: ['websocket']
    });
}

function App() {
    const [online, setOnline] = useState(false);
    const [socket] = useState(connectSocketServer());
    const [bands, setBands] = useState([]);
    useEffect(() => {
        setOnline( socket.connected )
    }, [socket]);

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true)
        })
    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket]);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            console.log(bands)
            setBands(bands)
        })
    }, [socket]);

    const votar = (id) => {
        socket.emit('votar-banda', id);
    }

    const eliminar = (id) => {
        socket.emit('eliminar-banda', id);
    }

    const updateName = (id, name) => {
        socket.emit('update-name', { id, name })
    }

    const addBand = (name) => {
        socket.emit('add-band', name)
    }

    return (
    <div className="container">
      <div className="alert">
          <p>Servis status:
              {
                  online ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span>
              }
          </p>
      </div>

        <h1>BandNames</h1>
        <hr/>

        <div className="row">
            <div className="col-8">
                <BandList data={bands} votar={votar} eliminar={eliminar} updateName={updateName}/>
            </div>
            <div className="col-4">
                <BandAdd addBand={addBand}/>
            </div>
        </div>

    </div>
  );
}

export default App;
