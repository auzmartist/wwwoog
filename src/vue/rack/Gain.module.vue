<template>
  <div class="gain">
    <div class="interface" :title="displayGain">
      <knob :initPct="0.25" @twist="setGain"></knob>
    </div>
    <span>{{displayGain}}</span>
  </div>
</template>

<script>
export default {
  name: 'gain',
  data: () => ({
    gain: 0,
    gainNode: null,
  }),
  computed: {
    displayGain() {
      return parseInt(this.gain * 100, 10)
    },
  },
  created() {
    this.gainNode = this.$ac.createGain()
    this.gainNode.gain.setValueAtTime(this.gain, this.$acNow())
    this.$watch('gain', (gain) => this.gainNode.gain.setValueAtTime(gain, this.$acNow()))
    this.$emit('module-ready', {in: this.gainNode, out: this.gainNode})
  },
  methods: {
    setGain(gain) {
      this.gain = gain
      this.gainNode.gain.setValueAtTime(gain, this.$acNow())
    },
  },
}
</script>

<style lang="stylus" scoped>
.gain
  width: 100px
  height: 200px
  span
    font-size: 2em
    display: flex
    justify-content: center
  .interface
    position relative
    padding: 36px 12px
    display: flex
    justify-content: center
</style>
