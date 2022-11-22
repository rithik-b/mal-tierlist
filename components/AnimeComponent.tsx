import {Anime} from "../lib/aliases"
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import {useDrag} from "react-dnd";

interface Props {
    anime: Anime
}

const AnimeContainer = styled.div`
  width: 168.75px;
  height: 235.5px;
  display: grid;
`

const AnimeTitle = styled.h4<{ hovered: boolean }>`
  grid-column: 2;
  grid-row: 2;
  text-align: center;
  
  ${props => props.hovered ? `
    animation-name: fadeIn;
    animation-duration: 0.5s;
    filter: brightness(1);
    ` : `
    display: none;
    `}
  
  @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  };
`

const AnimeImageContainer = styled.div<{ hovered: boolean }>`
  width: 168.75px;
  height: 235.5px;
  grid-column: 1 / span 3;
  grid-row: 1 / span 3;

  ${props => props.hovered ? `
    animation-name: fadein;
    animation-duration: 0.5s;
    filter: brightness(0.5);
  ` : `
    animation-name: fadeout;
    animation-duration: 0.5s;
    filter: brightness(1);
   `}

  @keyframes fadein {
    from {
      filter: brightness(1);
    }
    to {
      filter: brightness(0.5);
    }
  };

  @keyframes fadeout {
    from {
      filter: brightness(0.5);
    }
    to {
      filter: brightness(1);
    }
  };
`

const AnimeImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const AnimeComponent : React.FunctionComponent<Props> = props => {
    const { anime } = props
    const [hovered, setHovered] = React.useState(false)

    const [, drag] = useDrag(() => ({
        type: anime.list_status.score.toString(),
        item: anime,
    }))

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.clearData()
        event.dataTransfer.setData("text/animeScore", anime.list_status.score.toString())
        event.dataTransfer.effectAllowed = "move"
    }

    return (
        <AnimeContainer ref={drag} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <AnimeImageContainer hovered={hovered}>
                <AnimeImage src={anime.node.main_picture!.medium} alt={anime.node.title} width={225} height={317} unoptimized={true} />
            </AnimeImageContainer>
            <AnimeTitle hovered={hovered}><a href={`https://myanimelist.net/anime/${anime.node.id}`} target="_blank" rel="noopener noreferrer">{anime.node.title}</a></AnimeTitle>
        </AnimeContainer>
    )
}

export default AnimeComponent