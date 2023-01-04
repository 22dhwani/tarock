
const fakeArray = (length) => Array.from(Array(length).keys())

const CustomProgressBar = ({
  index,
  totalItems,
}) => {

  const array = fakeArray(totalItems)

  return (
    <div className="d-flex gap-1 mx-5">
      {
        array.map((val) => {
          const selected = val <= index
          return (
            <div
              key={val}
              style={{
                height: '2px',
                width: '100%',
                borderRadius: '2px',
                background: selected ? '#49304D' :'white',
              }}
            >
            </div>
          )
        })
      }
    </div>
  );
}

export default CustomProgressBar