const ChatResponse = ({ response }) => {
  if (!response) {
    return null; // Return null if there is no response
  }

  const { candidates, usageMetadata } = response;

  return (
    <div className="container-res my-4">
      <h3 className="text-center">Response</h3>
      {candidates.map((candidate, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">Candidate {index + 1}</h5>
            <p className="card-text">{candidate.content.parts[0].text}</p>
            {candidate.citationMetadata?.citationSources && (
              <>
                <h6>Citations:</h6>
                <ul className="list-group">
                  {candidate.citationMetadata.citationSources.map(
                    (source, idx) => (
                      <li className="list-group-item" key={idx}>
                        <a
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {source.uri}
                        </a>{" "}
                        (Indexes: {source.startIndex} - {source.endIndex})
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}

      <h4>Usage Metadata</h4>
      <div className="mb-2">
        <strong>Prompt Tokens:</strong> {usageMetadata.promptTokenCount}
      </div>
      <div className="mb-2">
        <strong>Response Tokens:</strong> {usageMetadata.candidatesTokenCount}
      </div>
      <div className="mb-2">
        <strong>Total Tokens:</strong> {usageMetadata.totalTokenCount}
      </div>
    </div>
  );
};

export default ChatResponse;
