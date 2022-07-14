import { onBeforeMount, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router';

export function usePreventRouteLeaveDialog(preventPageLeave) {
  onBeforeRouteLeave((to, from) => {
    if(!preventPageLeave.value) return true;
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    if (!answer) return false;
  });

  const handlePageReload = event => {
    if (!preventPageLeave.value) return;
    event.preventDefault();
    event.returnValue = "";
  };

  onBeforeMount(() => {
    window.addEventListener('beforeunload', handlePageReload); 
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handlePageReload);
  });
}