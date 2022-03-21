import { ClassAttributes, LiHTMLAttributes } from 'react'

export interface IImageGridProps {
  columns?: 2 | 3
}

export const ImageGrid: React.FC<IImageGridProps> = ({
  columns = 3,
  ...props
}) => (
  <ul
    className={`
      ${[2, 3].includes(columns) && 'sm:grid-cols-2'}
      ${[3].includes(columns) && 'md:grid-cols-3'} 
      mt-8 grid grid-cols-1 gap-4`}
    {...props}
  />
)

export const ImageGridItem = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLLIElement> &
    LiHTMLAttributes<HTMLLIElement>
) => <li className="next-image relative block overflow-hidden" {...props} />
