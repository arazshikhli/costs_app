import './style.css'

export const CostsHeader = () => {
    return (
        <div className="costs-header">
            <form>
                <div className='form-item'>
                    <span className='mb-3'>Куда было потрачено</span>
                    <input type="text" className='form-control' />
                </div>

                <div className='form-item'>
                    <span className='mb-3'>Сколько было потрачено</span>
                    <input type="text" className='form-control' />
                </div>

                <div className='form-item'>
                    <span className='mb-3'>Дата расхода</span>
                    <input type="date" className='form-control' />
                </div>
            </form>
        </div>
    )
}