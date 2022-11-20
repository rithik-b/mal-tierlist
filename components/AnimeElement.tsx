import {Anime} from "../lib/aliases"
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface Props {
    anime: Anime
}

const AnimeContainer = styled.div`
  width: 168.75px;
  height: 235.5px;
  display: grid;
`

const AnimeTitle = styled.h3<{ hovered: boolean }>`
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

const AnimeImage = styled(Image)<{ hovered: boolean }>`
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

const AnimeElement : React.FunctionComponent<Props> = props => {
    const {anime} = props
    const [hovered, setHovered] = React.useState(false)

    return (
        <AnimeContainer onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <AnimeImage src={anime.node.main_picture!.medium} alt={anime.node.title} width={168.75} height={235.5} hovered={hovered} />
            <AnimeTitle hovered={hovered}>{anime.node.title}</AnimeTitle>
        </AnimeContainer>
    )
}

export default AnimeElement