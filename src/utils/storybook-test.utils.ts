export async function waitForHydration(el: HTMLElement) {
  await new Promise<void>(resolve => {
    if (el.classList.contains('hydrated')) {
      resolve();
    } else {
      const observer = new MutationObserver(() => {
        if (el.classList.contains('hydrated')) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    }
  });
}
