import { ref, computed } from 'vue'

export default {
  setup() {
    const flightType = ref('one-way flight')
    const departureDate = ref(dateToString(new Date()))
    const returnDate = ref(departureDate.value)

    const isReturn = computed(() => flightType.value === 'return flight')

    const canBook = computed(
      () =>
        !isReturn.value ||
        stringToDate(returnDate.value) > stringToDate(departureDate.value)
    )

    function book() {
      alert(
        isReturn.value
          ? `Du har bokat ett flygresa tur och retur som avgår ${departureDate.value} och återvänder ${returnDate.value}.`
          : `Du har bokat en enkel flygresa som avgår ${departureDate.value}.`
      )
    }

    function stringToDate(str) {
      const [y, m, d] = str.split('-')
      return new Date(+y, m - 1, +d)
    }

    function dateToString(date) {
      return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate())
      )
    }

    function pad(n, s = String(n)) {
      return s.length < 2 ? `0${s}` : s
    }

    return {
      flightType,
      departureDate,
      returnDate,
      isReturn,
      canBook,
      book
    }
  }
}
