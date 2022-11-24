package com.ssafy.vue.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.vue.model.FavoriteDto;
import com.ssafy.vue.model.HouseDealDto;
import com.ssafy.vue.model.HouseInfoDto;
import com.ssafy.vue.model.SearchResponseDto;
import com.ssafy.vue.model.SidoGugunCodeDto;
import com.ssafy.vue.model.service.FavoriteService;
import com.ssafy.vue.model.service.HouseMapService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/map")
@Api("Map 컨트롤러  API V1")
public class HouseMapController {
    private final String SIDO_TYPE = "시";
    private final String GUGUN_TYPE = "구군";
    private final String DONG_TYPE = "동";
    private final String NAME_TYPE = "아파트명";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

    @Autowired
    private HouseMapService haHouseMapService;
    @Autowired
    private FavoriteService favoriteService;

    @ApiOperation(value = "시도 정보", notes = "전국의 시도를 반환한다.", response = List.class)
    @GetMapping("/sido")
    public ResponseEntity<List<SidoGugunCodeDto>> sido() throws Exception {
        logger.info("sido - 호출");
        return new ResponseEntity<List<SidoGugunCodeDto>>(haHouseMapService.getSido(), HttpStatus.OK);
    }

    @ApiOperation(value = "구군 정보", notes = "전국의 구군을 반환한다.", response = List.class)
    @GetMapping("/gugun")
    public ResponseEntity<List<SidoGugunCodeDto>> gugun(
            @RequestParam("sido") @ApiParam(value = "시도코드.", required = true) String sido) throws Exception {
        logger.info("gugun - 호출");
        return new ResponseEntity<List<SidoGugunCodeDto>>(haHouseMapService.getGugunInSido(sido), HttpStatus.OK);
    }

    @ApiOperation(value = "아파트 목록", notes = "지역코드와 매매계약월을 기준으로 아파트 목록을 반환한다.", response = List.class)
    @GetMapping(value = "/aptlist/{lawd_cd}/{deal_ymd}", produces = "application/json;charset=utf-8")
    public ResponseEntity<String> aptList(@PathVariable("lawd_cd") String lawdCd,
            @PathVariable("deal_ymd") String dealYmd) throws IOException {
        logger.info("sido - 호출");
        String serviceKey = "cO1KrpBH8DALiPiMGHopF8ZkfUIc6DjrsDE4AoZtTB6kzr1%2FbONuRxe%2B4t8k22v9cKXt1lDEwMt3BycjOhEfmA%3D%3D";
        StringBuilder urlBuilder = new StringBuilder(
                "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev"); /*
                                                                                                                             */
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder
                .append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지번호 */
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode("10", "UTF-8")); /* 한 페이지 결과 수 */
        urlBuilder.append(
                "&" + URLEncoder.encode("LAWD_CD", "UTF-8") + "=" + URLEncoder.encode(lawdCd, "UTF-8")); /* 지역코드 */
        urlBuilder.append(
                "&" + URLEncoder.encode("DEAL_YMD", "UTF-8") + "=" + URLEncoder.encode(dealYmd, "UTF-8")); /* 계약월 */
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
        JSONObject json = XML.toJSONObject(sb.toString());
        String jsonStr = json.toString();

        return new ResponseEntity<String>(jsonStr, HttpStatus.OK);
    }

    @GetMapping("/dong")
    public ResponseEntity<List<HouseInfoDto>> dong(@RequestParam("gugun") String gugun) throws Exception {
        return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getDongInGugun(gugun), HttpStatus.OK);
    }

    @GetMapping("/apt")
    public ResponseEntity<List<HouseInfoDto>> apt(@RequestParam("dong") String dong) throws Exception {
        return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getAptInDong(dong), HttpStatus.OK);
    }

    @GetMapping("/deal")
    public ResponseEntity<List<HouseDealDto>> deal(@RequestParam("aptCode") String aptCode) throws Exception {
        return new ResponseEntity<List<HouseDealDto>>(haHouseMapService.getAptDeal(aptCode), HttpStatus.OK);
    }

    @ApiOperation(value = "검색 자동완성", notes = "현재 검색어를 바탕으로 자동완성 추천을 반환한다.", response = List.class)
    @GetMapping("/searchlist")
    public ResponseEntity<List<SearchResponseDto>> search(@RequestParam("inputmsg") String inputMsg) throws Exception {
        return new ResponseEntity<List<SearchResponseDto>>(haHouseMapService.getSearchList(inputMsg), HttpStatus.OK);
    }

    @ApiOperation(value = "아파트 목록 By type", notes = "type과 name을 바탕으로 아파트 리스트를 반환한다.", response = List.class)
    @GetMapping("/apt/type")
    public ResponseEntity<?> aptByType(@RequestParam("name") String name, @RequestParam("type") String type)
            throws Exception {
        if (type.compareTo(NAME_TYPE) == 0) {
            return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getAptByName(name), HttpStatus.OK);
        } else if (type.compareTo(DONG_TYPE) == 0) {

            String dongCode = haHouseMapService.getDongByName(name.split(" ")[2]);
            return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getAptInDong(dongCode), HttpStatus.OK);
        } else if (type.compareTo(GUGUN_TYPE) == 0) {
            String gugunCode = haHouseMapService.getGugunByName(name.split(" ")[1]);
            return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getAptInGugun(gugunCode), HttpStatus.OK);
        } else if (type.compareTo(SIDO_TYPE) == 0) {
            String sidoCode = haHouseMapService.getSidoByName(name.split(" ")[0]);
            return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getAptInSido(sidoCode), HttpStatus.OK);
        } else {
            // error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "아파트", notes = "aptcode 를 바탕으로 아파트를 반환한다.", response = List.class)
    @GetMapping("/apt/code")
    public ResponseEntity<HouseInfoDto> aptByAptCode(@RequestParam("aptCode") String aptCode) throws Exception {
        return new ResponseEntity<HouseInfoDto>(haHouseMapService.getAptByAptCode(aptCode), HttpStatus.OK);
    }

    @ApiOperation(value = "즐겨찾기 추가", notes = "즐겨찾기 추가.", response = String.class)
    @PostMapping("/favor")
    public ResponseEntity<String> writeFavorite(
            @RequestBody @ApiParam(value = "즐겨찾기 정보.", required = true) FavoriteDto favoriteDto) throws Exception {
                logger.info("writeFavorite - 호출 {}",favoriteDto);
        if (favoriteService.writeFavorite(favoriteDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "즐겨찾기 목록", notes = "즐겨찾기 반환.", response = List.class)
    @GetMapping("/favor")
    public ResponseEntity<List<FavoriteDto>> listFavorite()
            throws Exception {
        logger.info("listFavorite - 호출");
        return new ResponseEntity<List<FavoriteDto>>(favoriteService.listFavorite(),
                HttpStatus.OK);
    }

    @ApiOperation(value = "즐겨찾기 삭제", notes = "즐겨찾기 삭제", response = String.class)
    @DeleteMapping("/favor")
    public ResponseEntity<String> deleteFavorite(
            @ApiParam(value = "살제할 글의 글번호.", required = true) FavoriteDto favoriteDto)
            throws Exception {
        logger.info("deleteFavorite - 호출");
        if (favoriteService.deleteFavorite(favoriteDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
    @GetMapping("/favor/apt")
    public ResponseEntity<List<HouseInfoDto>> getFavoriteApt(FavoriteDto favoriteDto) throws Exception {
        return new ResponseEntity<List<HouseInfoDto>>(haHouseMapService.getFavoriteApt(favoriteDto), HttpStatus.OK);
    }
}
