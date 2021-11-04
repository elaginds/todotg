import {
  faBatteryEmpty,
  faBatteryFull,
  faBatteryHalf,
  faEdit,
  faTrash,
  faTrashRestore,
  faTimesCircle,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';

export class IconsShared {
  public faIconPriorityFull = faBatteryFull;
  public faIconPriorityHalf = faBatteryHalf;
  public faIconPriorityEmpty = faBatteryEmpty;

  public faIconEdit = faEdit;
  public faIconTrash = faTrash;
  public faIconTrashRestore = faTrashRestore;

  public faIconDone = faCheckSquare;
  public faIconInputCancel = faTimesCircle;
}
