
const merge = (l, r) => {
  const head = { next: null };
  let current = head;
  while (l && r) {
    if (l.val < r.val) {
      current.next = l;
      l = l.next;
    } else {
      current.next = r;
      r = r.next;
    }
    current = current.next;
  }
  current.next = l || r || null;
  return head.next;
};

export const partition = (l) => {
  let slow = l;
  let fast = l;
  let preOfSlow;
  while (fast && fast.next) {
    preOfSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  const r = slow;
  preOfSlow.next = null;
  return { l, r };
};

export const mergeSort = (link) => {
  if (link && link.next) {
    const { l, r } = partition(link);
    const sortedL = mergeSort(l);
    const sortedR = mergeSort(r);
    return merge(sortedL, sortedR);
  }
  return link;
};


