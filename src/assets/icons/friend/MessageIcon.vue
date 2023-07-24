<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_11_2)">
      <path
        class="transition-all duration-500"
        d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="transition-all duration-500"
        d="M11.9998 0.85718C9.9842 0.857807 8.00653 1.40513 6.27741 2.44086C4.54828 3.47659 3.13247 4.96193 2.18076 6.73868C1.22906 8.51543 0.777101 10.5171 0.873029 12.5304C0.968958 14.5437 1.60918 16.4932 2.72551 18.1715L0.856934 23.1429L7.11408 22.0115C8.62078 22.7477 10.2742 23.1344 11.9512 23.1428C13.6281 23.1511 15.2853 22.7807 16.7993 22.0594C18.3132 21.3381 19.6448 20.2844 20.6948 18.9768C21.7447 17.6692 22.4861 16.1415 22.8634 14.5075C23.2408 12.8736 23.2445 11.1755 22.8743 9.53991C22.504 7.90432 21.7694 6.37338 20.7251 5.06123C19.6808 3.74908 18.3539 2.68956 16.8431 1.96164C15.3323 1.23372 13.6768 0.85619 11.9998 0.85718Z"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="transition-all duration-500"
        d="M19 12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12Z"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="transition-all duration-500"
        d="M7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12Z"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_11_2">
        <rect width="24" height="24" :fill="color" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white',
    required: false
  }
})
</script>
