#hshuzokuti 相手のh種族値
#hpwariaimae 飛び出す中身を受ける前のhp割合
#hpwariaiato 飛び出す中身を受けた後のhp割合
#nokorihp ウツボットの残りhp

def doryokutiyosou(hshuzokuti, hpwariaimae, hpwariaiato, nokorihp):

    if hpwariaimae < 0 or hpwariaimae > 100 or hpwariaiato < 0 or hpwariaiato > 100 or nokorihp < 0:
        return []

    candidates = []

    for hdoryokuti in range(33):

        hzissuuti = hshuzokuti + 75 + hdoryokuti  #hp実数値

        #%表示になりうるHP範囲
        hm = hzissuuti * hpwariaimae // 100
        ha = hzissuuti * (hpwariaimae + 1) // 100
        ha = min(ha, hzissuuti)

        for hontouhp in range(hm, ha + 1):

            #本当の%表示か確認
            hw = hontouhp * 100 // hzissuuti

            if hw != hpwariaimae:
                continue

            #とびだすなかみで与えた後のhp量
            damezi = hontouhp - nokorihp

            if damezi < 0:
                continue

            #ダメージ後表示
            if damezi == 0:
                dameziwariai = 0
            else:
                dameziwariai = max(1, damezi * 100 // hzissuuti)

            if dameziwariai == hpwariaiato:

                #まだ保存されていなければ追加
                if hdoryokuti not in candidates:
                    candidates.append(hdoryokuti)

    return candidates


#hshuzokuti2 相手のh種族値
#hdoryokuti2 相手のh努力値
#hpwariai 相手のhp割合

def hpyosou(hshuzokuti2, hdoryokuti2, hpwariai):

    if hdoryokuti2 < 0 or hdoryokuti2 > 32 or hpwariai < 0 or hpwariai > 100:
        return []

    candidates = []

    #h実数値計算
    hzissuuti = int(hshuzokuti2 + 75 + hdoryokuti2)
    
    #0%表示の場合
    if hpwariai == 0:
        candidates.append(0)
        return candidates

    #%表示になりうるHP範囲
    if hpwariai == 1:
        hm = 1
    else:
        hm = hzissuuti * hpwariai // 100
        
    ha = hzissuuti * (hpwariai + 1) // 100
    ha = min(ha, hzissuuti)

    for hontouhp in range(hm, ha + 1):

        #本当の%表示か確認
        hw = hontouhp * 100 // hzissuuti

        if hw != hpwariai:
            continue

        #まだ保存されていなければ追加
        if hontouhp not in candidates:
            candidates.append(hontouhp)
            
    return candidates


#ashuzokuti 相手のa種族値
#adoryokuti 相手のa努力値
#ahosei 相手のa補正
#aranku 相手のaランク

def kaihukuryouyosou(ashuzokuti, adoryokuti, ahosei, aranku):
    
    if adoryokuti < 0 or adoryokuti > 32:
        return []
    #a実数値計算
    azissuuti = int((ashuzokuti + 20 + adoryokuti) * ahosei)

    aa = int(azissuuti * aranku)

    print(aa)
    return aa
