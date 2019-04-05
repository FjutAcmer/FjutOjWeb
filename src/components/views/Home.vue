<template>
    <div>
        <div class="carousel">
        <Carousel></Carousel>
      </div>
      <div class="card" style="float:left">
        <RCompetition></RCompetition>
        <AcbCard style="margin-left:5px;"></AcbCard>
      </div>
      <div class="card">
        <RCard style="margin-right:5px"></RCard>
        <AcCard></AcCard>
        <AcbCard style="margin-left:5px"></AcbCard>
      </div>
    </div>
</template>

<script>
import Carousel from '@/components/common/CarouselGraph'
import RCard from '@/components/common/RatingCard'
import AcbCard from '@/components/common/AcbCard'
import AcCard from '@/components/common/AcCard'
import RCompetition from '@/components/common/RecentCompetition'

export default {
    components:{
    Carousel,RCard,AcCard,AcbCard,RCompetition
  }
}
</script>

<style>
.carousel{
  padding: 0;
  margin: 30px 18% 30px 18%;
}

.card{
  padding: 0;
  margin: 30px 18% 30px 18%;
  display: inline-flex;
}
</style>
