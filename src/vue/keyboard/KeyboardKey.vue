<template>
  <div class="key"
    :class="[`
      k:${keyData.index}`,
      keyData.name,
      {black: keyData.black},
    ]"
  >
    <span v-if="keyMap" class="keymap">{{keyMap.toUpperCase()}}</span>
  </div>
</template>

<script>
export default {
  name: 'key',
  props: {
    keyData: {required: true},
    keyMap: {default: null},
  },
  computed: {
    frequency() {
      return this.$ft.toHz(this.keyData.name)
    },
  },
  mounted() {
    this.addComputedStyles(this.$el)
    this.$el.addEventListener('mousedown', (e) => this.$emit('keydown', {
      name: this.keyData.name,
      frequency: this.frequency
    }))
    this.$el.addEventListener('mouseup', (e) => this.$emit('keyup', {
      name: this.keyData.name,
      frequency: this.frequency
    }))
  },
  methods: {
    addComputedStyles(el) {
      el.setAttribute('style', `
        left: ${this.keyData.dims.x}px;
        width: ${this.keyData.dims.W}px;
        height: ${this.keyData.dims.H}
      `)
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'

.key
  position: absolute
  left: 0
  top: 0
  background: white
  background: #fafafa
  gradient(0deg, #fafafa 93%, darken(#fafafa, 3%) 96%)
  border-bottom-left-radius: 5px
  border-bottom-right-radius: 5px
  box-shadow: 0 1px 1px 1px #cacaca
  cursor: pointer
  &.black
    background: #444
    gradient(0deg, darken(#444, 15%) 8%, #444 11%, #444 89%, darken(#444, 10%) 94%)
    height: 110px
    z-index: 1000
    box-shadow: none
    & > .keymap
      color: #888
  & > .keymap
    position: absolute
    bottom: 0
    left: 50%
    transform: translate(-50%, -50%)
    color: #aaa
    pointer-events: none
    user-select: none
</style>

