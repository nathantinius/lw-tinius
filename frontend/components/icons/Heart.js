function Heart({ width, height, testId, selected}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={width}
             height={height}
             className={selected ? "selected-heart" : "heart"}
             viewBox="0 0 16 16"
             data-testid={testId}
        >
            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    )
}
export default Heart