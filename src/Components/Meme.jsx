import React, { useState, useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { IoIosCreate } from 'react-icons/io';
import html2canvas from 'html2canvas';

import Select from './Select';
import DisplayMeme from './DisplayMeme';

export default function Meme() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState();
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [letra, setLetra] = useState('');
  const [tamaño, setTamaño] = useState(10);
  const [color, setColor] = useState('');
  const [mem, setMem] = useState();
  const [mostrar, setMostrar] = useState(true);

  // Llamada api
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((data) => data.json())
      .then((json) => {
        setMemes(json.data.memes);
        setMeme(json.data.memes[0]);
      });
  }, []);

  // Función utilizando html2canvas para descargar meme
  const descargar = () => {
    html2canvas(document.querySelector('.descarga'), {
      allowTaint: true,
      useCORS: true,
      width: 300,
    }).then(function (canvas) {
      let img = canvas.toDataURL('memes/jpg');
      let link = document.createElement('a');
      link.download = 'memepropio.jpg';
      link.href = img;
      link.click();
    });
  };

  // Función llamada POST a API para crear meme
  const apiPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('template_id', meme.id);
    formData.append('username', 'luvaras6');
    formData.append('password', 'Imgapi123');
    formData.append('font', letra);
    formData.append('max_font_size', tamaño);
    formData.append('boxes[0][text]', topText);
    formData.append('boxes[0][color]', color);
    formData.append('boxes[1][text]', bottomText);
    formData.append('boxes[1][color]', color);

    const response = await fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData,
    });
    const datos = await response.json();
    console.log(datos);
    setMem(datos.data.url);
    setMostrar(!mostrar);
  };

  return (
    <div className="container">
      <section>
        {/*primer paso */}
        <div className="border border-secondary p-2">
          <h5> Primero: Ingresa el texto del meme</h5>

          <form onSubmit={apiPost}>
            <input
              onChange={(e) => {
                setTopText(e.target.value);
              }}
              className="mr-2"
              value={topText}
              type="text"
              placeholder="Primera frase"
              name="meme"
              arial-label="default input example"
            ></input>
            <input
              onChange={(e) => {
                setBottomText(e.target.value);
              }}
              value={bottomText}
              type="text"
              placeholder="Segunda frase"
              name="meme"
              arial-label="default input example"
            ></input>

            <div className="my-3 text-center">
              <button type="submit" className="btn-primary">
                <IoIosCreate /> Crear meme
              </button>
              <button
                onClick={descargar}
                type="button"
                className="btn-secondary ml-2"
              >
                <BsDownload /> Descargar meme
              </button>
            </div>
          </form>
        </div>

        {/* meme seleccionado y edit de fuente, tamaño y color */}
        <section className="border border-secondary p-2 my-5">
          <h5> Segundo: Selecciona tipo de letra tamaño y color</h5>
          <div className="d-flex justify-content-around flex-wrap text-center">
            {mostrar ? (
              <div className="meme-elegido">
                {meme && <DisplayMeme meme={meme} />}
              </div>
            ) : (
              <div className="meme-final">
                {mem && (
                  <div>
                    <img
                      style={{ width: 300 }}
                      src={mem}
                      alt="custom meme"
                      className="descarga"
                    />
                  </div>
                )}
              </div>
            )}
            <div>
              <Select
                cambioLetra={(e) => {
                  setLetra(e.target.value);
                }}
                cambioColor={(e) => {
                  setColor(e.target.value);
                }}
                cambioTamaño={(e) => {
                  setTamaño(e.target.value);
                }}
              />
            </div>
          </div>
        </section>
      </section>
      {/*selecciona un meme para poder editarlo  */}
      <section className='border border-secondary p-2 text-center'>
        <h5>
          Tercero: Selecciona uno de estos memes para poder editarlo en el paso
          dos
        </h5>
        <div>
          <h4 className="text-center">Memes disponibles 👇🏽</h4>
          <div className="d-flex justify-content-center flex-wrap">
            {memes.map((meme) => (
              <div key={meme.id} className="m-2">
                {meme && (
                  <DisplayMeme
                    meme={meme}
                    onClick={() => {
                      setMeme(meme);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
