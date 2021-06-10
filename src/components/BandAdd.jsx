import React, { useState } from 'react';

function BandAdd({addBand}) {
    const [valor, setValor] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        console.log(valor)
        if(valor.trim().length > 0){
            addBand(valor);
            setValor('');
        }
    }
    return (
        <>
            <h3>Agregar Banda</h3>
            <form
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de banda"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                />
            </form>
        </>
    );
}

export default BandAdd;
