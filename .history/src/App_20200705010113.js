import React from 'react';

// import Cards from './components/Cards/Cards.jsx';
// import Chart from './components/Chart/Chart.jsx';
// import CountryPicker from './components/CountryPicker/CountryPicker.jsx';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData} from './api';
import Zoom from 'react-reveal/Zoom';
import { AnimationWrapper } from 'react-hover-animation';
import numeralogo from './images/favicon.png';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import imagen from './images/perfiloptimizada.jpg';
// Acá se agrega el componente
class App extends React.Component {
    state = {
        data: {},
        provincia: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (provincia) => {
        const fetchedData = await fetchData(provincia);
        console.log(fetchedData)
        this.setState({ data: fetchedData, provincia: provincia })
    }


    render() {
        const { data, provincia} = this.state;


        return (
        <div className={styles.container}>
            <Zoom>
                <AnimationWrapper>
                <p className={styles.menu}><a href="adinamarca.github.io" className={styles.enlacefuente}>Volver a numeral.lab</a></p>
                </AnimationWrapper>
                <AnimationWrapper>
                <img className={styles.imagen} src={numeralogo} alt="Logo de Numeral.Lab" />
                </AnimationWrapper>
                <AnimationWrapper>
                <h1 className={styles.titulo}>Seguimiento COVID-19</h1>
                </AnimationWrapper>
                <AnimationWrapper>
                <h3 className={styles.chile}>Chile</h3>
                </AnimationWrapper>
                <AnimationWrapper>
                <h4 className={styles.fuente}>Las cifras a continuación son de <a className={styles.enlacefuente} href="https://covid19.mathdro.id/">fuente internacional</a>. Las regiones están ordenadas por número de casos totales.</h4>
                </AnimationWrapper>
                <AnimationWrapper>
                <Cards data={data} />
                </AnimationWrapper>
            </Zoom>
                <AnimationWrapper>
                <CountryPicker className={styles.selector} handleCountryChange = {
                    this.handleCountryChange
                }
                </AnimationWrapper>
                />
                <Chart data={data} provincia={provincia} />
                <Zoom>
                    <AnimationWrapper>
                    <h5 className={styles.titulo}>Créditos y contacto</h5>
                    </AnimationWrapper>
                    <AnimationWrapper>
                    <p className={styles.fuente}> La aplicación fue desarrollada en un principio por <a className = {styles.enlacefuente}
                    href = "youtube.com/javascriptmastery" > JavaScript Mastery </a> y se sustenta en las fuentes de <a className={styles.enlacefuente} href="https://covid19.mathdro.id/"> la API de COVID19 de MathDro</a>. Posteriormente fue modificada por
                    </p>
                    </AnimationWrapper>
                    <AnimationWrapper>
                    <a a className={styles.enlacefuente} href="linkedin.com/alejandrodinamarca"><Chip className={styles.chipp} label="Alejandro Dinamarca" color="secondary" avatar={<Avatar src={imagen} />} /></a>
                    </AnimationWrapper>
                    <AnimationWrapper><p className={styles.fuente}>La aplicación obtiene los datos de Chile y sus regiones, esto tomó un trabajo de 18 hrs.; espero sea de utilidad y pueda proveer de información en tiempo real para la ciudadanía. </p>
                    </AnimationWrapper>
                    <AnimationWrapper>
                    <p className={styles.contacto}>La visualización de datos empodera las decisiones con inteligencia. Usémosla y seamos conscientes de que de nosotros depende que la pandemia no escale. Cuidémonos en medida de lo posible y salgamos adelante. </p>
                    </AnimationWrapper> 
                </Zoom>
        </div>
        )
    }
}

export default App;