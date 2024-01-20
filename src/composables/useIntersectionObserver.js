import { ref, onMounted } from "vue";
export default function useIntesectionObserver(rootMargin) {
  const showElement = ref(false);
  const wrapperRef = ref(null);
  const observeVisibilityOnTheDOM = () => {
    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          showElement.value = true;
        }
      },
      {
        root: null,
        rootMargin: rootMargin || "5%",
        threshold: 1.0,
      }
    );
    if (wrapperRef.value) {
      observer.observe(wrapperRef.value);
    }
  };
  onMounted(observeVisibilityOnTheDOM);
  return {
    showElement,
    wrapperRef,
  };
  
}
