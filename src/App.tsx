import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem'

const App  = () => {
  const [heightField, setHeightField] = useState<number>(0)
  const [weighttField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)
  const handleCalculateButton = () => {
    if(heightField && weighttField){
      setToShow(calculateImc(heightField, weighttField))
    }else {
      alert('Digite todos os campos.')
    }
  }
  const handleBackButton = () =>{
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} width={150} alt="" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
          type="number" 
          placeholder='Digite a sua Altura. Ex: 75.3 (em kg)'
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />
          <input 
          type="number" 
          placeholder='Digite a seu Peso. Ex: 1.5 (em métros)'
          value={weighttField > 0 ? weighttField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item} />
              ))}
            </div>
           }
           {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem  item={toShow} />
            </div>
           }
        </div>
      </div>
    </div>
  )
}

export default App;