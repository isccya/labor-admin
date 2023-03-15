<template>
  <search></search>
  <list></list>
</template>

<script>
import List from './list';
import Search from './search';
export default{
  name:'Log',
  components:{List,Search}
}

</script>
