'use client'

interface PaginationProps {
	totalPages: number
	currentPage: number
	onPageChange: (page: number) => void
}

const Pagination = ({
	totalPages,
	currentPage,
	onPageChange,
}: PaginationProps) => {
	return (
		<div className='flex gap-3 justify-center mt-4 mb-4 bg-black/30 px-4 py-2 rounded-full'>
			{Array.from({ length: totalPages }).map((_, index) => (
				<button
					key={index}
					className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
						currentPage === index ? 'bg-white scale-125' : 'bg-white/50'
					}`}
					onClick={() => onPageChange(index)}
					aria-label={`Страница ${index + 1}`}
				/>
			))}
		</div>
	)
}

export default Pagination
