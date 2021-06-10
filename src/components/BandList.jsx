import React, { useState, useEffect } from 'react';

function BandList({data, votar, eliminar, updateName}) {
    const [bands, setBands] = useState(data);
    useEffect(() => {
        setBands(data)
    }, [data]);

    const cambioNombre = (e, id) => {
        const nuevoNombre = e.target.value;
        setBands( bands => bands.map(band => {
            if(band.id === id){
                band.name = nuevoNombre
            }
            return band;
        }) );
    }

    const onPerdioFoco = (id, nombre) => {
        updateName(id, nombre)
    }

    const crearRows = () => {
        return (
                bands.map((band, index) => (
                    <tr key={index}>
                        <td>
                            <button onClick={() => votar(band.id)} className="btn btn-primary">+1</button>
                        </td>
                        <td>
                            <input
                                value={band.name}
                                type="text" className="form-control"
                                onChange={ (e) => cambioNombre(e, band.id) }
                                onBlur={() => onPerdioFoco( band.id, band.name )}
                            />
                        </td>
                        <td>
                            <h3> { band.votes } </h3>
                        </td>
                        <td>
                            <button onClick={() => eliminar(band.id)} className="btn btn-danger">Borrar</button>
                        </td>
                    </tr>
                ))
        );
    }
    return (
        <>
            <h3>Lista de Bandas</h3>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                {
                    crearRows()
                }
                </tbody>
            </table>
        </>
    );
}

export default BandList;
