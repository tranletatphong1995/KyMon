const oldData = JSON.parse(localStorage.getItem('fengShuiData'));
   const newData = {
     CửuTinh: oldData.CelestialStars.map(star => ({
       ...star,
       elementType: 'NgũHành',
       yinYang: star.yinYang === 'Yin' ? 'Âm' : 'Dương'
     })),
     BátMôn: oldData.Gates.map(gate => ({
       ...gate,
       elementType: 'NgũHành'
     })),
     BátThần: oldData.Spirits.map(spirit => ({
       ...spirit,
       elementType: 'NgũHành'
     })),
     CáchCục: oldData.Formations.map(formation => ({
       ...formation,
       auspiciousness: formation.auspiciousness === 'Auspicious' ? 'Cát' : 
                       formation.auspiciousness === 'Inauspicious' ? 'Hung' : 'Tùy thuộc'
     }))
   };
   console.log(JSON.stringify(newData));