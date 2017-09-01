<template>
  <div class="me">
    <h1>{{ msg }}</h1>
    <div class="myoperations">
      <button type="button" @click="simplifyBpData($event)">generate</button>
      <span>{{ simplifiedBP.length }}</span>
      <div>{{ simplifiedBP }}</div>
    </div>
    <div class="mapping">
      <button type="button" @click="transformData($event)">transform</button>
      <span>{{ transformResult.length }}</span>
      <div>{{ transformResult }}</div>
    </div>
  </div>
</template>

<script>
import faker from '../util/faker'
import Transform from '../util/transform'

export default {
  name: 'me',
  data () {
    return {
      msg: 'Welcome to Me Area',
      simplifiedBP: [],
      transformResult: []
    }
  },
  methods: {
    simplifyBpData: function (event) {
      var bpData = faker.getBPData()
      var result = []

      bpData.value = bpData.value || []

      bpData.value.forEach(function (item) {
        var simplified = {
          CardCode: item.CardCode,
          CardName: item.CardName,
          CardType: item.CardType,
          GroupCode: item.GroupCode,
          Address: item.Address,
          Valid: item.Valid,
          BPAddresses: item.BPAddresses
        }

        result.push(simplified)
      })

      this.simplifiedBP = result
      console.log(JSON.stringify(result))
    },
    transformData: function (event) {
      var transformed = Transform.transform2TargetJSON(faker.getBpMappingRule(), faker.getBpSimplifiedData())

      this.transformResult = transformed
      console.log(JSON.stringify(transformed))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
