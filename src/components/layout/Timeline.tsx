import { Tweet } from './Tweet';

export function Timeline() {
  return (
    <div className='w-full max-w-xl grid grid-cols-1 gap-4'>
      <Tweet />
    </div>
  );
}
