import React,{ useState, useEffect, useRef } from "react";
import styles from "./slotSlider.module.css";
import slotImage1 from "../../images/slotImage.png";
import slotImage2 from "../../images/slotImage1.png";
import slotImage3 from "../../images/slotImage2.png";
import slotImage4 from "../../images/slotImage3.png";
import slotImage5 from "../../images/slotImage4.png";
import slotImage6 from "../../images/slotImage5.png";

type Props = {
  leftPosition: number;
  sliderIndex: number;
  isStops: boolean[];
}

const SlotSlider: React.FC<Props> = ({ leftPosition, sliderIndex, isStops}) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const rafRef = useRef<number | null>(null);
  
  const sliderRef = useRef(null);

  const speed = 30;
  const maxScroll = 0;

  useEffect(() => {
    const sliderHeight = sliderRef.current?.clientHeight;
    if(sliderHeight) {
      setSlidePosition(-sliderHeight); 
    }
  }, []); 
  
  const animation = () => {
    if(!isStops[sliderIndex]){
      const sliderHeight = sliderRef.current?.clientHeight;
      setSlidePosition((prev) => {
        const newPosi = prev + speed;
        if (newPosi >= maxScroll) {
          return -sliderHeight;
        }
        return newPosi;
      });

      rafRef.current = requestAnimationFrame(animation);
    } else {
      if(rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  };

  useEffect(() => {
    // isStopsの状態が変化した時に、このuseEffectが発火する
    if (isStops[sliderIndex]) {
      // スライドを停止する処理
  
      // 1. アニメーションフレームを即座にキャンセルし、スライドの動きを一旦止める
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
  
      // すべてのスライダー画像要素を取得
      const sliderImageBoxes = sliderRef.current.querySelectorAll(`.${styles.sliderImgBox}`);
      // コンテナの要素サイズと位置を取得
      const containerRect = sliderRef.current.parentElement.getBoundingClientRect();
      // コンテナの中央Y位置を計算
      const containerCenterY = 430;
      console.log('containerCenterY', containerCenterY);
      // containerRect.top + containerRect.height / 2;
  
      // 最も近い画像の距離を無限大で初期化し、最も近い画像要素を格納する変数を定義
      let closestDistance = Infinity;
      let closestElement = null;
  
      // 2. 各画像の中心位置とコンテナ中央位置との差を計算し、最も近い画像を特定
      sliderImageBoxes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const imageCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenterY - imageCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = el;
        }
      });

      if (closestElement) {
        const closestKey = closestElement.getAttribute("data-key");
        console.log("最も近い画像のkeyは:", closestKey);
      }      
  
      // 3. 特定した最も近い画像がコンテナ中央にぴったり合うように微調整を行う
      if (closestElement) {
        const closestRect = closestElement.getBoundingClientRect();
        const offset = containerCenterY - (closestRect.top + closestRect.height / 2);
  
        // スライド位置を調整した新しい位置でセット
        setSlidePosition((prev) => prev + offset);
  
        // 4. 微調整した位置にスムーズに移動するようCSSトランジションを追加
        sliderRef.current.parentElement.style.transition = 'transform 0.9s ease-out';
        sliderRef.current.parentElement.style.transform = `translateY(${slidePosition + offset}px)`;
  
        // CSSトランジションが完了したらトランジションをリセット
        setTimeout(() => {
          sliderRef.current.parentElement.style.transition = '';
        }, 900);
      }
  
    } else {
      // スライドが再開された場合はアニメーションを再開する
      rafRef.current = requestAnimationFrame(animation);
    }
  
    // コンポーネントがアンマウントされる際、アニメーションフレームをクリーンアップ
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  
  }, [isStops[sliderIndex]]);
  
  
  // useEffect(() => {
  //   animation();

  //   return () => {
  //     if (rafRef.current) {
  //       cancelAnimationFrame(rafRef.current);
  //     }
  //   };
  // }, [isStops[sliderIndex]]);
  

  const slotImages = [
    {id: 1, src:slotImage1.src},
    {id: 2, src:slotImage2.src},
    {id: 3, src:slotImage3.src},
    {id: 4, src:slotImage4.src},
    {id: 5, src:slotImage5.src},
    {id: 6, src:slotImage6.src},
  ];

  return(
    <div style={{ left: `${leftPosition}%` }} className={styles.container}>
      <div className={styles.cover}>
        <div 
          style={{ 
            transform: `translateY(${slidePosition}px)`
          }} 
          className={styles.sliderContainer}
        >
          <div className={styles.sliderImages} ref={sliderRef}>
            {slotImages.map(({id, src}) => (
              <div 
                key={id} 
                className={styles.sliderImgBox}
                data-key={id}
              >
                <img  className={styles.sliderImg} src={src}></img>
              </div>
            ))}
          </div>
          <div className={styles.sliderImages}>
            {slotImages.map(({id, src}) => (
              <div 
                key={id} 
                className={styles.sliderImgBox}
                data-key={id}
              >
                <img className={styles.sliderImg} src={src}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default SlotSlider;
